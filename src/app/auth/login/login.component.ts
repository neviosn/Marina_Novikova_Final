import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError = false;
  constructor(private router: Router, private authService: AuthService) {}

  onLogin(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login(email, password).subscribe({
      next: (user) => {
        localStorage.setItem('userId', String(user.id));
        localStorage.setItem('userEmail', user.email);
        this.router.navigate(['/mainpage']);
      },
      error: () => {
        this.loginError = true;
      }
    });
  }
}
