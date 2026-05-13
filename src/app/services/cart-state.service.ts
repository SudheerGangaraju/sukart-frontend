import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService, CartItem } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private apiService: ApiService) {}

  clearCartCount(): void {
    this.cartCountSubject.next(0);
  }

  refreshCartCount(): void {
    this.apiService.getCart().subscribe({
      next: (items: CartItem[]) => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCountSubject.next(total);
      },
      error: (err) => {
        console.error('Cart API failed', err);
        this.cartCountSubject.next(0); // fallback
      },
    });
  }
}
