import { Component, OnInit } from '@angular/core';
import { ApiService, CartItem, Product } from 'src/app/services/api.service';
import { CartStateService } from 'src/app/services/cart-state.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(
    private apiService: ApiService,
    private cartState: CartStateService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      },
    });
  }

  addToCart(product: Product): void {
    if (!this.authService.isLoggedIn()) {
      alert('You must log in first!');
      return;
    }

    this.apiService.getCart().subscribe({
      next: (items: CartItem[]) => {
        const existingItem = items.find((item) => item.productId === product.id);

        if (existingItem) {
          if (existingItem.quantity >= 5) {
            alert(`${product.name} is already at the maximum quantity.`);
            return;
          }

          this.apiService
            .updateCartItem(existingItem.id, {
              ...existingItem,
              quantity: existingItem.quantity + 1,
            })
            .subscribe({
              next: () => {
                this.cartState.refreshCartCount();
                alert(`${product.name} quantity updated!`);
              },
              error: () => alert('Failed to update cart'),
            });
          return;
        }

        this.apiService
          .addToCart({ id: 0, productId: product.id, quantity: 1 })
          .subscribe({
            next: () => {
              this.cartState.refreshCartCount();
              alert(`${product.name} added to cart!`);
            },
            error: () => alert('Failed to add to cart'),
          });
      },
      error: () => alert('Failed to check cart'),
    });
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
