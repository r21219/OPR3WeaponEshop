import {Component} from '@angular/core';
import {WeaponService} from "../weapon/weapon.service";
import {Weapon} from "../weapon/weapon.model";
import {PageEvent} from "@angular/material/paginator";
import {ItemRequest} from "../item-request";
import {CartService} from "../cart/cart.service";
import {UpdateCartRequest} from "../update-cart-request";
import {AuthService} from "../auth/auth.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  weapons: Weapon[] = [];
  currentPage = 1;
  itemsPerPage = 4;
  totalItems = 0;
  count = 1;

  constructor(
    private weaponService: WeaponService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadWeapons();
  }

  loadWeapons(): void {
    this.weaponService.getAllWeapons().subscribe(weapons => {
      this.weapons = weapons;
      this.totalItems = this.weapons.length; // Update totalItems here
    });
  }

  get weaponsToDisplay(): Weapon[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.weapons.slice(startIndex, endIndex);
  }

  onPageChange(pageEvent: PageEvent): void {
    this.currentPage = pageEvent.pageIndex + 1;
  }

  addToCart(weapon: Weapon, count: number): void {
    const itemRequest = new ItemRequest(weapon.id, weapon.price, count);
    const username = this.authService.getLoggedInUserName() || 'defaultUsername';
    const updateCartRequest: UpdateCartRequest = { requestedItems: [itemRequest] };

    this.cartService.updateCart(username, updateCartRequest)
      .pipe(
        catchError(error => {
          console.error('Error updating cart:', error);
          throw error;
        })
      )
      .subscribe(cart => {
        console.log('Cart updated successfully:', cart);
      });
  }
}




