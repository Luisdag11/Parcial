import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any[]>(`https://fakestoreapi.com/products`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`https://fakestoreapi.com/products/categories`);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`https://fakestoreapi.com/products/category/${category}`);
  }
}
