import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {UpdateCartRequest} from "../update-cart-request";
import {AuthService} from "../auth/auth.service";
import {Cart} from "../cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/v1/cart';

  constructor(private http: HttpClient, private authService: AuthService) { }
  getCart(): Observable<Cart> {
    const username = this.authService.getLoggedInUserName() || 'defaultUsername';
    const url = `${this.baseUrl}/current/${username}`;
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Cart>(url, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching cart:', error);
        throw error;
      })
    );
  }

  updateCart(username: string, updateCartRequest: UpdateCartRequest): Observable<any> {
    const url = `${this.baseUrl}/${username}`;
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(url, updateCartRequest, { headers }).pipe(
      catchError(error => {
        console.error('Error updating cart:', error);
        throw error;
      })
    );
  }
}

