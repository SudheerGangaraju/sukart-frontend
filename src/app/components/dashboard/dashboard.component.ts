import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService, CartItem, Product } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

interface CartItemView extends CartItem {
  product?: Product;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  topProducts: Product[] = [];
  products: Product[] = [];
  cartItems: CartItemView[] = [];
  username = '';
  loading = true;
  error = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername() || 'User';
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = '';

    forkJoin({
      topProducts: this.apiService.getTopProducts(),
      products: this.apiService.getProducts(),
      cartItems: this.apiService.getCart(),
    }).subscribe({ 
      next: ({ topProducts, products, cartItems }) => {
        this.topProducts = topProducts;
        this.products = products;
        this.cartItems = cartItems.map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId),
        }));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      },
    } );
  }

  getCartTotal(): number {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  trackByCartItemId(index: number, item: CartItemView): number {
    return item.id;
  }
}
