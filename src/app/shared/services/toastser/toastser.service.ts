import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toasController: ToastController) { }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toasController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }
}
