import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { LoadingService } from '../../services/loadingser/loadingser.service';

@Component({
  standalone: false,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent  implements OnInit, OnChanges {

  products: any[] = [];
  @Input() selectedCategory: string = '';
  @Input() sortOrder: string = '';
  
    constructor(private apiStore: HttpService, private readonly loadingS: LoadingService) { }
  
    ngOnInit() {
      this.loadProducts();
    }
    
    ngOnChanges(changes: SimpleChanges) {
      if (changes['selectedCategory']) {
        if (this.selectedCategory) {
          this.loadProductsByCategory();
        } else {
          this.loadProducts();
        }
      }
      if (changes['sortOrder']) {
        this.sortProducts();
      }
    }

    loadProductsByCategory() {
      if (!this.selectedCategory) return;

      this.loadingS.show('Cargando productos...');

      this.apiStore.getProductsByCategory(this.selectedCategory).subscribe((data) => {
        this.products = data;
        this.sortProducts();
        this.loadingS.dismiss();
      },
    (error) => console.error('Error al cargar los productos por categoria', error)
  );
    }

    loadProducts(){
      this.loadingS.show('Cargando productos...');

      this.apiStore.getProducts().subscribe((data: string[]) => {
        console.log('Api array', this.products);
        this.products = data;
        this.sortProducts();
        this.loadingS.dismiss();
      })
    }

    sortProducts() {
      if (!this.products.length) return;

      switch (this.sortOrder) {
        case 'price-asc':
          this.products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          this.products.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          this.products.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name-desc':
          this.products.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
    }

}
