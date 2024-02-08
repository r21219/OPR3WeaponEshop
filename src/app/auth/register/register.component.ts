import { Component } from '@angular/core';
import {catchError} from "rxjs";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username!: string;
  password!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.username, this.password)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Registration failed. Please try again.';
          throw error;
        })
      )
      .subscribe(response => {
        this.router.navigate(['/index']);
      });
  }
}
