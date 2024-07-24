import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';




@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:7110/api/Product';

  constructor(private https: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.https.get<any[]>(this.apiUrl);
  }

  createProduct(): string {
    return this.apiUrl;
  }

  deleteProduct(id: number): Observable<void> {
    console.log('deleteProduct called with id:', id);
    return this.https.delete<void>(`${this.apiUrl}/${id}`);
  }
 
  updateProduct(id: number, productForm: any):Observable<void>{
    return this.https.put<void>(`${this.apiUrl}/${id}`,productForm);
  }

  
}
  /*
  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/ById/${id}`;
    return this.http
      .get<Product>(url)
      .pipe(catchError(this.handleError<Product>(`getProductById id=${id}`)));
  }

  getProductByName(name: string): Observable<Product> {
    const url = `${this.apiUrl}/ByName/${name}`;
    return this.http
      .get<Product>(url)
      .pipe(
        catchError(this.handleError<Product>(`getProductByName name=${name}`))
      );
  }

  insertProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.apiUrl, product)
      .pipe(catchError(this.handleError<Product>('insertProduct')));
  }

  updateProduct(id: number, product: Product): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .put(url, product)
      .pipe(catchError(this.handleError<any>('updateProduct')));
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError<any>('deleteProduct')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }*/

