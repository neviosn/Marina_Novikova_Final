import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<{ id: number; email: string }> {
      return this.http.post<{ id: number; email: string }>('http://localhost:3000/login', { email, password });
    }

    register(email: string, password: string): Observable<{ id: number; email: string }> {
      return this.http.post<{ id: number; email: string }>('http://localhost:3000/register', { email, password });
    }

    logout(): void {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
    }

    getUserEmail(): string | null {
      return localStorage.getItem('userEmail');
    }

    isLoggedIn(): boolean {
      return !!this.getUserEmail();
    }
  }
