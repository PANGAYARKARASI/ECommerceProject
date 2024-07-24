import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuyService {
  private apiUrl = 'https://localhost:7110/api/Address';

  constructor(private http: HttpClient) {}

  getAllAddress(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createAddress(): string {
    return this.apiUrl;
  }

  deleteProduct(addressId: number): Observable<void> {
    console.log('delete Address called with id:', addressId);
    return this.http.delete<void>(`${this.apiUrl}/${addressId}`);
  }

  updateProduct(addressId: number, addressForm: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${addressId}`, addressForm);
  }

  getAddressById(addressId: number): Observable<any> {
    return this.http.get<any>(
      `https://localhost:7110/api/Address/ByAddressId/${addressId}`
    );
  }
}
