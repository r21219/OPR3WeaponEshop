import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  username: string | null = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getLoggedInUserName();
  }

  logout(): void {
    this.authService.logout();
  }
}
