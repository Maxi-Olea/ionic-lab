import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './modals/photo-modal/photo-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PhotoModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
