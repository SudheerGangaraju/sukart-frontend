import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AIResponse } from '../models/ai-chat.model';

@Injectable({
  providedIn: 'root'
})
export class AIChatService {
  private baseUrl = 'http://localhost:8080'; // Change this to your backend URL
  constructor(private http: HttpClient) { }

  askAI(prompt: string) {
  return this.http.post<AIResponse>(`${this.baseUrl}/ai/chat`, {
    prompt: prompt
  });
}
}
