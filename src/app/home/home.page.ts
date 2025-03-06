import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/localstorage/localstorage.service';
import { LoadingService } from '../shared/services/loadingser/loadingser.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{

  isLoading: boolean = true;
  categorySelected: string = '';
  sortOrder: string = 'price-asc'
  cartItemCount: number = 0;

  constructor(private readonly cartS: CartService) {}

  ngOnInit() {
    
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    this.cartS.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }
}