import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loadingser/loadingser.service';
import { CartService } from 'src/app/shared/services/localstorage/localstorage.service';
import { ToastService } from 'src/app/shared/services/toastser/toastser.service';

@Component({
  standalone: false,
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  checkOut: FormGroup;
  isProcessing: boolean = false;

  constructor(private fb: FormBuilder, private readonly cartS: CartService, private readonly toastS: ToastService, private router: Router, private readonly loadingS: LoadingService) {
    this.checkOut = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
   }

  ngOnInit() {
    this.checkOut.get('fullName')?.valueChanges.subscribe(() => {
      this.validateName();
    })
  }

  processPayment() {
    if (this.checkOut.invalid) {
      this.toastS.showToast('Porfavor, completa todos los campos correctamente.', 'warning');
      return;
    }

    this.isProcessing = true;

    this.loadingS.show('Procesando pago...');

    setTimeout(() => {
      this.isProcessing = false;
      this.loadingS.dismiss();

      let cartItem: any[] = [];
      this.cartS.getCart().subscribe(cart => {
        cartItem = [...cart];
      })

      localStorage.setItem('lastPurchase', JSON.stringify({
        customer: this.checkOut.value,
        cart: cartItem
      }));

      this.cartS.clearCart();
      
      this.toastS.showToast('Pago exitoso. Redirigiendo...', 'success');

      this.router.navigate(['/summary']);
    }, 3000);
  }

  validateName() {
    let name = this.checkOut.get('fullName')?.value || '';

    name = name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

    this.checkOut.get('fullName')?.setValue(name, { emitEvent: false });
  }
}