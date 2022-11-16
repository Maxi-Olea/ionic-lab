import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  takePicture() {
    console.log('Clicked on take a picture!');
    
  }

  pickPicture() {
    console.log('Clicked on pick a picture!');
    
  }

}
