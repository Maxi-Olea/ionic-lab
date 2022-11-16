export interface Geo {
    coords:     Coords;
    timestamp:  number;

}

interface Coords {
    accuracy:           number;
    altitude:           number | null;
    altitudeAccuracy:   number | null | undefined;
    heading:            number | null;
    latitude:           number;
    longitude:          number;
    speed:              number | null;
}

export interface Coordinates {
    latitude:   number;
    longitude:  number;
}