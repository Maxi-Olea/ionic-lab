import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  getPicture(source: CameraSource) {
    return from( Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      source: source,
    })
    );
  }

}
