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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItemView[] = [];
  products: Product[] = [];
  loading = true;
  error = '';

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

  increaseQuantity(item: CartItemView): void {
    if (item.quantity < 5) {
      item.quantity++;
      this.apiService.updateCartItem(item.id, item).subscribe({
        next: () => this.cartState.refreshCartCount(),
        error: () => alert('Failed to update item'),
      });
    }
  }

  decreaseQuantity(item: CartItemView): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.apiService.updateCartItem(item.id, item).subscribe({
        next: () => this.cartState.refreshCartCount(),
        error: () => alert('Failed to update item'),
      });
    }
  }

  removeItem(item: CartItemView): void {
    console.log('Removing item', item);
    this.apiService.deleteCartItem(item.id).subscribe({
      next: () => {
        this.loadCart();
        this.cartState.refreshCartCount();
      },
      error: () => alert('Failed to remove item'),
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  }
}
