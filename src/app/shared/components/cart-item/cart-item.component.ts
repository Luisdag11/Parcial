import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/localstorage/localstorage.service';

@Component({
  standalone: false,
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent  implements OnInit {
  
  @Input() item: any;
  @Output() remove = new EventEmitter<any>();

  constructor(private readonly cartS: CartService) { }

  ngOnInit() {}

  removeItem() {
    this.remove.emit(this.item);
  }

  inCreaseCant() {
    this.item.quantity++;
    this.cartS.updateCart(this.item);
  }

  deCreaseCant() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
      this.cartS.updateCart(this.item);
    } else {
      this.removeItem();
    }
  }
}
