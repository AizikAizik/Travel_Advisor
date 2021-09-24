import {Coords} from "google-map-react";

export type DropdownItem = 'restaurants' | 'hotels' | 'attractions';

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface BoundsInterfaces {
    ne: Coords;
    sw: Coords;
}