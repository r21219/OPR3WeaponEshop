import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authBaseUrl = 'http://localhost:8080/api/v1/user/auth';
  private userBaseUrl = 'http://localhost:8080/api/v1/user';
  private tokenKey = 'auth-token';
  private loggedInUserName: string | null = null;

  constructor(private router: Router,private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authBaseUrl}/login`, { userName: username, password: password })
      .pipe(
        tap(response => {
          this.storeToken(response.token);
          this.loggedInUserName = username;
          console.log('Token stored: ', response.token);
        })
      );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authBaseUrl}/register`, { userName: username, password: password })
      .pipe(
        tap(response => this.storeToken(response.token))
      );
  }

  deleteUser(username: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.userBaseUrl}`, { headers, body: { userName: username } });
  }

  updateUser(currentUsername: string, newUsername: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.userBaseUrl}`, { newUserName: newUsername, currentUserName: currentUsername }, { headers });
  }

  getUser(userId: number): Observable<string> {
    const headers = this.getHeaders();
    return this.http.get<string>(`${this.userBaseUrl}/${userId}`, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) ?? null;
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    debugger
    const token = this.getToken();
    var isLogged = false;
    if (token !== 'auth-token' && token !== null){
      isLogged = true;
    }
    return isLogged
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInUserName = null;
    this.router.navigate(['/login']);
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }
}
