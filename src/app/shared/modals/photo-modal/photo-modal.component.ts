import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
})
export class PhotoModalComponent {

  constructor(
    private modalCtrl: ModalController
  ) { }

  img!: string;

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
