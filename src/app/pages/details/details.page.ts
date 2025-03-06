import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { LoadingService } from 'src/app/shared/services/loadingser/loadingser.service';
import { CartService } from 'src/app/shared/services/localstorage/localstorage.service';

@Component({
  standalone: false,
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: any = { rating: {} };
  cartItemCount: number = 0;

  constructor(private readonly apiStore: HttpService, private readonly actiRouter: ActivatedRoute, private readonly cartS: CartService, 
    private readonly loadingS: LoadingService
  ) { }

  async ngOnInit() {
    this.loadDetails();
    this.cartS.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  loadDetails() {
    this.loadingS.show('Cargando detalles...');

    const id = this.actiRouter.snapshot.paramMap.get('id');
    if(id){
      this.apiStore.getProductById(+id).subscribe((data: string[]) => {
        this.details = data;
        this.loadingS.dismiss();
        console.log(data);
      })
    }
  }

  addToCart(product: any) {
    this.cartS.addToCart(product);
  }

}