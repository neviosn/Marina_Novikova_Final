import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private users = [
        { id: 'u1', email: 'test@example.com', password: '12345678' },
        { id: 'u2', email: 'user2@example.com', password: 'qwerty' }
      ];
      
  
    register(id: string, email: string, password: string) {
      this.users.push({ id, email, password });
      console.log('Users after registration:', this.users);
    }

    getUsers() {
      return this.users;
    }
  
    login(email: string, password: string): { id: string; email: string } | null {
      const users = this.getUsers();
      const found = users.find(u => u.email === email && u.password === password);
      return found ? { id: found.id, email: found.email } : null;
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
    }}
    