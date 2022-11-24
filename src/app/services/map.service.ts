import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private mapOpts = [
    {
      name: 'Satellite',
      value: 'satellite-v9'
    },
    {
      name: 'Light',
      value: 'light-v10'
    },
    {
      name: 'Dark',
      value: 'dark-v10'
    },
    {
      name: 'Street',
      value: 'streets-v11'
    },
    {
      name: 'Outdoors',
      value: 'outdoors-v11'
    },
  ];

  constructor() { }

  get mapOptions() {
    return this.mapOpts;
  }

}
