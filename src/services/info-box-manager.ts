import {Injectable, NgZone} from 'angular2/core';
import {GoogleMapInfoBox} from '../directives/google-map-info-box';
import {GoogleMapsAPIWrapper} from './google-maps-api-wrapper';
import {MarkerManager} from './marker-manager';
import {LatLng} from './google-maps-types';
import {InfoBox, InfoBoxOptions} from './info-box-types';

@Injectable()
export class InfoBoxManager {
  private _infoBoxes: Map<GoogleMapInfoBox, Promise<InfoBox>> =
      new Map<GoogleMapInfoBox, Promise<InfoBox>>();

  constructor(
      private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone,
      private _markerManager: MarkerManager) {}

  deleteInfoBox(infoBox: GoogleMapInfoBox): Promise<void> {
    const iWindow = this._infoBoxes.get(infoBox);
    if (iWindow == null) {
      // info window already deleted
      return Promise.resolve();
    }
    return iWindow.then((i: InfoBox) => {
      return this._zone.run(() => {
        this._infoBoxes.delete(infoBox);
      });
    });
  }

  setPosition(infoBox: GoogleMapInfoBox): Promise<void> {
    return this._infoBoxes.get(infoBox).then((i: InfoBox) => {
        i.setPosition(new google.maps.LatLng(infoBox.latitude,infoBox.longitude))
    });
  }

  setZIndex(infoBox: GoogleMapInfoBox): Promise<void> {
    return this._infoBoxes.get(infoBox)
        .then((i: InfoBox) => i.setZIndex(infoBox.zIndex));
  }

  setOptions(infoBox: GoogleMapInfoBox, options: InfoBoxOptions) {
    return this._infoBoxes.get(infoBox).then((i: InfoBox) => i.setOptions(options));
  }
  
  setContent(infoBox: GoogleMapInfoBox) {
    return this._infoBoxes.get(infoBox).then((i: InfoBox) => i.setContent(infoBox.content));
  }

  addInfoBox(infoBox: GoogleMapInfoBox) {
    const options: InfoBoxOptions = {
        content: infoBox.content,
        boxStyle: infoBox.boxStyles,
        disableAutoPan: true,
        pixelOffset: new google.maps.Size(10, -10),
        closeBoxURL: "",
        isHidden: false,
        pane: "mapPane",
        enableEventPropagation: true
    };
    if (typeof infoBox.latitude === 'number' && typeof infoBox.longitude === 'number') {
      options.position = new google.maps.LatLng(infoBox.latitude,infoBox.longitude);
    }
       
    const infoBoxPromise = this.createInfoBox(options);
    this._infoBoxes.set(infoBox, infoBoxPromise);
  }
  
    createInfoBox(options?: InfoBoxOptions): Promise<InfoBox> {
        return this._mapsWrapper.getMap().then((map) => { 
            var infoBox: InfoBox = new InfoBox(options); 
            infoBox.open(map);
            infoBox.setVisible(true);
            return infoBox;
        });
    }
}
