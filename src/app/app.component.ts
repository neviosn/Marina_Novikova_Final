import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.userEmail = this.authService.getUserEmail();
  }

  logout() {
    this.authService.logout();
    this.userEmail = null;
  }
}