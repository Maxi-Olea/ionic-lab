import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './modals/photo-modal/photo-modal.component';
import { IonicModule } from '@ionic/angular';
import { MarkerModalComponent } from './modals/marker-modal/marker-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PhotoModalComponent,
    MarkerModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
