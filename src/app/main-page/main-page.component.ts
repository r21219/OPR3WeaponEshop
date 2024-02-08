import {Component} from '@angular/core';
import {WeaponService} from "../weapon/weapon.service";
import {Weapon} from "../weapon/weapon.model";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  weapons: Weapon[] = [];
  currentPage = 1;
  itemsPerPage = 4;

  constructor(private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.loadWeapons();
  }

  loadWeapons(): void {
    this.weaponService.getAllWeapons().subscribe(weapons => {
      this.weapons = weapons;
    });
  }

  get weaponsToDisplay(): Weapon[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.weapons.slice(startIndex, endIndex);
  }

  get pages(): number[] {
    const numberOfPages = Math.ceil(this.weapons.length / this.itemsPerPage);
    return Array(numberOfPages).fill(0).map((_, i) => i + 1);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
