import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerError = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    const { fullName, email, password } = form.value;

    this.authService.register(email, password).subscribe({
      next: (user) => {
        localStorage.setItem('userId', String(user.id));
        localStorage.setItem('userName', fullName);
        localStorage.setItem('userEmail', user.email);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.registerError = err.status === 409 ? 'Email already exists' : 'Registration failed';
      }
    });
  }
}
