import { Injectable } from '@angular/core';
import { ToastService } from '../toastser/toastser.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>(this.loadCartStorage());
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(private readonly toastS: ToastService) { 
    this.updateCartItemCount();
  }

  ngOnInit() {}
  
  private loadCartStorage(): any[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  getCart(): Observable<any[]> {
    return this.cart.asObservable();
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  addToCart(product: any) {
    let currentCart = this.loadCartStorage();

    if (!Array.isArray(currentCart)) {
      currentCart = [];
    }

    const existProduct = currentCart.find((p: any) => p.id === product.id);

    if (existProduct) {
      existProduct.quantity++;
    } else {
      product.quantity = 1;
      currentCart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(currentCart));
    this.cart.next(currentCart);
    this.updateCartItemCount();
    
    this.toastS.showToast('Producto agregado al carrito', 'success');
  }
  
  removeCart(product: any) {
    let currentCart = this.loadCartStorage();

    if (!Array.isArray(currentCart)) {
      currentCart = [];
    }
    
    currentCart = currentCart.filter((p: any) => p.id !== product.id);
    this.cart.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    this.cartItemCount.next(currentCart.length)
    this.toastS.showToast('Producto eliminado del carrito', 'danger');
  }

  private updateCartItemCount() {
    const currentCart = this.loadCartStorage();
    this.cartItemCount.next(currentCart.length);
  }

  updateCart(product: any) {
    let currentCart = this.loadCartStorage();

    if (!Array.isArray(currentCart)) {
      currentCart = [];
    }

    const index = currentCart.findIndex((p: any) => p.id === product.id);

    if (index !== -1) {
      currentCart[index] = product;
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    this.cart.next(currentCart);
    this.updateCartItemCount();
  }

  clearCart() {
    this.cart.next([]);
    localStorage.removeItem('cart');
    this.cartItemCount.next(0);
  }
}