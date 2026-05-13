import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-cart-badge',
  templateUrl: './navbar-cart-badge.component.html',
  styleUrls: ['./navbar-cart-badge.component.css'],
})
export class NavbarCartBadgeComponent {
  @Input() count = 0;

  getDisplayCount(): string {
    return this.count > 99 ? '99+' : String(this.count);
  }
}
