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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    const { id, fullName, email, password } = form.value;
  
    this.authService.register(id, email, password);
  
    localStorage.setItem('userId', id);
    localStorage.setItem('userName', fullName);
    localStorage.setItem('userEmail', email);
  
    this.router.navigate(['/login']);
  }
  
  
}
