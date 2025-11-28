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
    const user = this.authService.login(email, password);

if (user) {
  localStorage.setItem('userId', user.id || user.email); 
  localStorage.setItem('userEmail', user.email);
  this.router.navigate(['/mainpage']);
} else {
  this.loginError = true;
}
  }
  
}
