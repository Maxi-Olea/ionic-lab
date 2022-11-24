import * as mapboxgl from 'mapbox-gl';

export interface MapMarker {
    info: Info;
    marker: mapboxgl.Marker;
}

export interface Info {
    title: string;
    description: string;
}