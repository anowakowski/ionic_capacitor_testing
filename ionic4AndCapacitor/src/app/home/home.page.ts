import { Component } from '@angular/core';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public toastController: ToastController) {}

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.presentToastWithOptions(coordinates);
  }

  private async presentToastWithOptions(coordinates: GeolocationPosition) {
    const toast = await this.toastController.create({
      message: 'coordinates: \n' + 'latitude: ' + coordinates.coords.latitude + '\nlongitude: ' + coordinates.coords.longitude,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done'
    });
    toast.present();
  }
}
