import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {}

  private hasToken(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  login(token: string) {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userEmail', 'user@example.com');
    //sessionStorage.setItem('userRole', 'userrole'); // Example email
    this.loggedIn.next(true);
  }

  logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userEmail');
    //sessionStorage.removeItem('userRole');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
