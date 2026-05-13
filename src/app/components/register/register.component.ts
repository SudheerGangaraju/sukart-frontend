import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = { username: '', password: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.message = 'Registration successful! You can now log in.';
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.message = 'Registration failed!';
      },
    });
  }
}
