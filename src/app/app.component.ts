import { Component } from '@angular/core';
import { CartStateService } from './services/cart-state.service';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ekart-frontend';
  cartCount = 0;

  constructor(
    private cartState: CartStateService,
    private themeService: ThemeService,
    private authService: AuthService,
  ) {
    this.themeService.initializeTheme();
    this.cartState.cartCount$.subscribe((count) => (this.cartCount = count));
    if (this.authService.isLoggedIn()) {
      this.cartState.refreshCartCount();
    }
  }
}
