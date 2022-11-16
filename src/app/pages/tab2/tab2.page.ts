import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Coordinates, Geo } from 'src/app/interfaces/geolocation.interface';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { environment } from 'src/environments/environment';

declare let mapboxgl: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  map: any;
  coordinates: Coordinates | null = null;

  @ViewChild('mapMenu') mapMenu!: ElementRef

  mapOptions = [
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

  constructor(
    private geolocation: GeolocationService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getGeolocation();
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().subscribe({
      next: (geoData: Geo) => {
        this.coordinates = {
          latitude : geoData.coords.latitude,
          longitude: geoData.coords.longitude
        }
        console.log('las coordenadas son: ', this.coordinates);
        this.initializeMap();                
      }, 
      error: _ => {
        console.log('ocurrio un error');       
      }      
    })
  }

  initializeMap() {
    mapboxgl.accessToken = environment.mapToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        this.coordinates!.longitude,
        this.coordinates!.latitude
      ],
      zoom: 15
    });
    this.map.on('load', () => {
      //FIT SCREEN
      this.map.resize();
      //SET POSITION MARKER
      new mapboxgl.Marker()
      .setLngLat([
        this.coordinates!.longitude,
        this.coordinates!.latitude
      ])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>Your are around here!</h3>
            <p>Don't you?</p>`
          ))
      .addTo(this.map);
    })
  }

  setMapStyle(style: string): void {
    this.map.setStyle(`mapbox://styles/mapbox/${style}`)
    this.renderer.selectRootElement(this.mapMenu).close();
  }

}
