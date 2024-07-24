import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly UserUrl = 'https://localhost:7110/api/User'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // RegisterPost(): string {
  //   return this.UserUrl;
  // }

  register(account: any): Observable<any> {
    return this.http.post(`${this.UserUrl}`, account);
  }

  login(Email: string, Password: string): Observable<any> {
    return this.http.get(`${this.UserUrl}/Login/${Email}/${Password}`);
  }

  // async GetUser(Email: string, Password: string): Promise<any> {
  //   const response = await fetch(`${this.UserUrl}/Login/${Email}/${Password}`);

  //   if (!response.ok) {
  //     console.error('Failed to fetch user data:', response.statusText);
  //     return null;
  //   } else {
  //     var userData = response.json();
  //     return userData;
  //   }
  // }
}