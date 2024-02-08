import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Weapon} from "./weapon.model";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  private apiUrl = 'http://localhost:8080/api/v1/weapon';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllWeapons(): Observable<Weapon[]> {
    const headers = this.getHeaders();
    return this.http.get<Weapon[]>(this.apiUrl, { headers });
  }

  getWeaponById(id: number): Observable<Weapon> {
    const headers = this.getHeaders();
    return this.http.get<Weapon>(`${this.apiUrl}/${id}`, { headers });
  }

  addWeapon(weapon: Weapon): Observable<Weapon> {
    const headers = this.getHeaders();
    return this.http.post<Weapon>(this.apiUrl, weapon, { headers });
  }

  updateWeapon(weapon: Weapon): Observable<Weapon> {
    const headers = this.getHeaders();
    return this.http.put<Weapon>(`${this.apiUrl}/${weapon.id}`, weapon, { headers });
  }

  deleteWeapon(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
