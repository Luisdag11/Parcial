import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loadingser/loadingser.service';
import { CartService } from 'src/app/shared/services/localstorage/localstorage.service';

@Component({
  standalone: false,
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private readonly cartS: CartService, private router: Router, private readonly loadingS: LoadingService) { }

  ngOnInit() {
    this.loadCart();
    this.cartS.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.calcularTotal();
    })
  }

  loadCart() {
    this.loadingS.show('Cargando carrito...');

    this.cartS.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.calcularTotal();
      this.loadingS.dismiss();
    });
  }

  removeCart(item: any) {
    this.cartS.removeCart(item);
    this.loadCart();
  }

  calcularTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => + sum + item.price * (item.quantity), 0);
  }

  checkOut() {
    this.router.navigate(['/checkout']);
  }
}