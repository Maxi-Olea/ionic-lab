import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Coordinates, Geo } from 'src/app/interfaces/geolocation.interface';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/services/map.service';
import { ModalController } from '@ionic/angular';
import { MarkerModalComponent } from 'src/app/shared/modals/marker-modal/marker-modal.component';


// declare let mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {

  map: any;
  coordinates: Coordinates | null = null;

  mapOptions!: any[];

  touchDuration: number = 500; //sets the duration of the touch needed to add a Marker
  isLongTouch: boolean = false;
  timer!: any;

  @ViewChild('mapMenu') mapMenu!: ElementRef

  

  constructor(
    private geolocation: GeolocationService,
    private mapService: MapService,
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getGeolocation();
    this.getMapOptions();
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().subscribe({
      next: (geoData: Geo) => {
        this.coordinates = {
          latitude : geoData.coords.latitude,
          longitude: geoData.coords.longitude
        }
        this.initializeMap();                
      }, 
      error: _ => {
        console.log('ocurrio un error');       
      }      
    })
  }
  
  getMapOptions() {
    this.mapOptions = this.mapService.mapOptions;
  }

  initializeMap() {
    (mapboxgl as any).accessToken = environment.mapToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        this.coordinates!.longitude,
        this.coordinates!.latitude
      ],
      zoom: 15
    });

    //Setting up eventListeners of the MapObject
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
        new mapboxgl.Popup({ offset: 25, maxWidth: '75%' }) // add popups
          .setHTML(
            `<h3>Your are around here!</h3>
            <p>Don't you?</p>`
          ))
      .addTo(this.map);
    })

    this.map.on('touchstart', (e: any) => {
      
      this.timer = setTimeout(() => {
        this.openMarkerModal(e.lngLat);
      }, this.touchDuration)
    });

    this.map.on('touchend', (event: any) => {
      clearTimeout(this.timer);
    });

  }

  setMapStyle(style: string): void {
    this.map.setStyle(`mapbox://styles/mapbox/${style}`)
    this.renderer.selectRootElement(this.mapMenu).close();
  }

  async openMarkerModal(coords: mapboxgl.LngLat) {
    const modal = await this.modalCtrl.create({
      component: MarkerModalComponent,
      id: 'marker-modal',
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();


    if(role === 'confirm') {
      const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)); // generate a random color code
      const marker = new mapboxgl.Marker({ color })
      .setLngLat(coords)
      .setPopup(
        new mapboxgl.Popup({ offset: 25, maxWidth: '75%' }) // add popups
          .setHTML(
            `<h3>${data.title}</h3>
            <p>${data.description}</p>`
          )
      )
      .addTo(this.map);
    }
  }

}
