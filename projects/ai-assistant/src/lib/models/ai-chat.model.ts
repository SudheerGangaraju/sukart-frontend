export interface AIResponse {
  recommendation: string;
  products: any[]; // later you can create Product interface
}

export interface Product {
  id: number;
  name: string;
  price: number;
}