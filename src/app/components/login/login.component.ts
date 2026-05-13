import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartStateService } from 'src/app/services/cart-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cartStateService: CartStateService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    // ✅ Reactive form setup
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Save JWT token in sessionStorage
          this.authService.saveTokens(response);

         // Refresh cart count after login
          this.cartStateService.refreshCartCount();
          // Navigate to dashboard page
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          this.errorMessage = 'Invalid credentials, try again!';
          console.error('Login error:', err);
        },
      });
    }
  }
}
