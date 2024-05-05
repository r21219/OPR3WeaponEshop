import {WeaponOrderLine} from "./weapon-order-line.model";

export interface Cart {
  id: number;
  userName: string;
  weaponOrderLineDTO: WeaponOrderLine[];
}
