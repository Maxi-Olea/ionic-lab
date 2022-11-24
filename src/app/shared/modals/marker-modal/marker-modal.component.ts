import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Info } from 'src/app/interfaces/marker.interface';

@Component({
  selector: 'app-marker-modal',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.scss'],
})
export class MarkerModalComponent implements OnInit {

  markerForm!: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.markerForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  saveMarker() {
    const markerInfo: Info = this.markerForm.value;
    console.log('marker-info: ', markerInfo);
    return this.modalCtrl.dismiss(markerInfo, 'confirm');
    
    
  }

  async cancel() {
    if (await this.closeActionSheet()) {
      console.log('Cancel and close the modal');
      return this.modalCtrl.dismiss(null, 'cancel');
    }
    console.log('Stays in the modal');
    return
  }

  async closeActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure to cancel?',
      subHeader: 'If you cancel, the Marker won\'t be added',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',          
        },       
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();
    console.log(role);
    
    return role === 'confirm';
  }

}
