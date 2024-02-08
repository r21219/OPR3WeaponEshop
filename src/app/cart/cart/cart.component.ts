import {Component, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {Cart} from "../../cart.model";
import {MatTableDataSource} from "@angular/material/table";
import {WeaponOrderLine} from "../../weapon-order-line.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['weaponName', 'totalPrice', 'count'];
  cartItemsDataSource = new MatTableDataSource<WeaponOrderLine>();

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe((cart: Cart) => {
      this.cartItemsDataSource.data = cart.weaponOrderLineDTO;
    });
  }
}
