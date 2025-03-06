import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { RouterModule } from '@angular/router';
import { SelectComponent } from './components/select/select.component';
import { SortComponent } from './components/sort/sort.component';
import { ButtonComponent } from './components/button/button.component';
import { LoadingService } from './services/loadingser/loadingser.service';

const Components = [
  ProductsComponent,
  CartItemComponent,
  SelectComponent,
  SortComponent,
  ButtonComponent
]

const Modules = [
  CommonModule,
  IonicModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule
]

const Providers = [
  LoadingService
]


@NgModule({
  declarations: [... Components],
  imports: [
    ... Modules
  ],
  providers: [... Providers],
  exports: [... Modules, ... Components]
})
export class SharedModule { }
