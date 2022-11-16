import { Injectable } from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';
import { from, Observable } from 'rxjs';
import { Geo } from '../interfaces/geolocation.interface';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getCurrentPosition (): Observable<Geo> {
    return from( Geolocation.getCurrentPosition() ) 
     
  };

}
