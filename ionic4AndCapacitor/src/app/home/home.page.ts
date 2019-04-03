import { Component } from '@angular/core';
import { Plugins, GeolocationPosition, CameraResultType, CameraSource } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const { Geolocation, Camera } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  image: SafeResourceUrl;

  constructor(public toastController: ToastController, private domSanitizer: DomSanitizer) {}

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.presentToastWithOptions(coordinates);
  }

  async takePicture() {
    const result = await Camera.getPhoto({
      quality: 75,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
    });

    this.image = this.domSanitizer.bypassSecurityTrustResourceUrl(result && result.base64Data);
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
