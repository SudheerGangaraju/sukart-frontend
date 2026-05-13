import { Component, OnInit } from '@angular/core';
import { ApiService, CartItem, Product } from 'src/app/services/api.service';
import { CartStateService } from 'src/app/services/cart-state.service';

interface CartItemView {
  id: number;
  productId: number;
  quantity: number;
  product?: Product;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItemView[] = [];
  products: Product[] = [];
  loading = true;
  error = '';
  orderPlaced = false;

  constructor(
    private apiService: ApiService,
    private cartState: CartStateService,
  ) {}

  ngOnInit(): void {
    // Load products first
    this.apiService.getProducts().subscribe({
      next: (prods) => {
        this.products = prods;
        this.loadCart();
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      },
    });
  }

  loadCart(): void {
    this.apiService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items.map((i) => ({
          ...i,
          product: this.products.find((p) => p.id === i.productId),
        }));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load cart';
        this.loading = false;
      },
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  }

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Clear all items from cart
    this.cartItems.forEach((item) => {
      this.apiService.deleteCartItem(item.id).subscribe({
        next: () => this.cartState.refreshCartCount(),
      });
    });

    this.cartItems = [];
    this.orderPlaced = true;
    this.cartState.clearCartCount();
  }
}
