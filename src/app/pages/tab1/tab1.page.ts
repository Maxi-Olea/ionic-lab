import { Component } from '@angular/core';
import { CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { PhotoModalComponent } from 'src/app/shared/modals/photo-modal/photo-modal.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  images: any = [];
  isModalOpen = false;

  constructor(
    private camera: CameraService,
    private modalCtrl: ModalController
  ) {}


  getPicture(source: string) {
    this.camera.getPicture(source as CameraSource).subscribe({
      next: (photo) => {
        console.log('info de la foto: ', photo);      
        let imgUrl = photo.webPath;
        console.log('imgurl: ', imgUrl);
        
        this.images.push(imgUrl)  
      },
      error: _ => { console.log('Ocurrió un error'); }      
    })
    
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async openModal(img: string) {
    const modal = await this.modalCtrl.create({
      component: PhotoModalComponent,
      componentProps: { img }
    });
    modal.present();

  }

}
