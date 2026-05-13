import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { AIChatService } from '../../services/ai-chat.service';
import { AIResponse, Product} from '../../models/ai-chat.model';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AIChatComponent {

  prompt = '';
  response = '';
  loading = false;
  products: Product[] = [];

  constructor(
    private aiChatService: AIChatService, 
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  askAI() {
    if (!this.prompt.trim()) return;

    this.loading = true;
    this.response = ''; // Clear previous response

    console.log('Sending prompt:', this.prompt);

    this.aiChatService.askAI(this.prompt).subscribe({
      next: (res: AIResponse) => {
        this.ngZone.run(() => {
          console.log('Response received:', res);
          this.response = res.recommendation;
          this.products = res.products;
          this.loading = false;
          this.cdr.markForCheck(); // Mark for check instead of detectChanges
          console.log('Response set to:', this.response);
          console.log('Loading:', this.loading);
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error('Error:', err);
          this.response = 'Something went wrong: ' + err.message;
          this.loading = false;
          this.cdr.markForCheck();
        });
      }
    });
  }
}