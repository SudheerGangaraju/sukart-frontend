import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}



@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;
  myName = 'ApiService';
  aiResponse = '';
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getTopProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/top-products`);
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/cart`);
  }

  addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/cart`, item);
  }

  updateCartItem(id: number, item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.baseUrl}/cart/${id}`, item);
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cart/${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}

