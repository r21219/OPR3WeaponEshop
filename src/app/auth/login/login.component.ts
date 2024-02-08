import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {catchError, of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Login failed. Please try again.';
          return of(null);
        })
      )
      .subscribe(response => {
        if (response !== null) {
          this.router.navigate(['/index']);
        }
      });
  }
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}

