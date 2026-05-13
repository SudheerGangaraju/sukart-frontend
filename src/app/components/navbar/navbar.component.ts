import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppTheme, ThemeService } from '../../services/theme.service';
import { CartStateService } from 'src/app/services/cart-state.service';
import { NavbarCartBadgeComponent } from '../navbar-cart-badge/navbar-cart-badge.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  // Example 1: @ViewChild reading an element from this component's own template.
  @ViewChild('themeSelect') themeSelect?: ElementRef<HTMLSelectElement>;

  private cartBadgeComponent?: NavbarCartBadgeComponent;

  // Example 2: @ViewChild reading a child component instance.
  @ViewChild(NavbarCartBadgeComponent)
  set cartBadge(component: NavbarCartBadgeComponent | undefined) {
    this.cartBadgeComponent = component;
  }

  availableThemes: { label: string; value: AppTheme }[] = [
    { label: 'Default', value: 'theme-default' },
    { label: 'Dark', value: 'theme-dark' },
    { label: 'Forest', value: 'theme-forest' },
  ];
  selectedTheme: AppTheme;

  constructor(
    public authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private cartStateService: CartStateService,
  ) {
    this.selectedTheme = this.themeService.getCurrentTheme();
  }

  ngAfterViewInit(): void {
    console.log(
      'Theme select value from own template:',
      this.themeSelect?.nativeElement.value,
    );
  }

  logout(): void {
    this.authService.logout();
    this.cartStateService.clearCartCount();
    this.router.navigate(['/auth/login']);
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get cartCount$() {
    return this.authService.isLoggedIn() ? this.cartStateService.cartCount$ : null;
  }

  onThemeChange(theme: string): void {
    this.selectedTheme = theme as AppTheme;
    this.themeService.applyTheme(this.selectedTheme);
  }

  focusThemeSelect(): void {
    this.themeSelect?.nativeElement.focus();
  }

  logCartBadgeFromChild(): void {
    console.log(
      'Cart badge text from child component:',
      this.cartBadgeComponent?.getDisplayCount(),
    );
  }
}
