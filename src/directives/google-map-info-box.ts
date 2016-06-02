import {Component, SimpleChange, OnDestroy, OnChanges, ElementRef} from 'angular2/core';
import {InfoBoxManager} from '../services/info-box-manager';
import {SebmGoogleMapMarker} from './google-map-marker';
import { InfoBoxStyle } from './../services/info-box-types';

let infoWindowId = 0;

@Component({
  selector: 'google-map-info-box',
  inputs: ['latitude', 'longitude', 'boxStyles'],
  template: `
    <div class='google-map-info-box-content'>
      <ng-content></ng-content>
    </div>
  `
})
export class GoogleMapInfoBox implements OnDestroy, OnChanges {

  latitude: number;
  
  longitude: number;
  
  content: string|Node;

  zIndex: number;

  maxWidth: number;

  hostMarker: SebmGoogleMapMarker;
  
  boxStyles: InfoBoxStyle;

  private static _infoBoxOptionsInputs: string[] = ['disableAutoPan', 'maxWidth'];
  private _infoBoxAddedToManager: boolean = false;
  private _id: string = (infoWindowId++).toString();

  constructor(private _infoBoxManager: InfoBoxManager, private _el: ElementRef) {}

  ngOnInit() {
    this.content = this._el.nativeElement.querySelector('.google-map-info-box-content');
    this._infoBoxManager.addInfoBox(this);
    this._infoBoxAddedToManager = true;
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (!this._infoBoxAddedToManager) {
      return;
    }
    if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
        typeof this.longitude === 'number') {
      this._infoBoxManager.setPosition(this);
    }
    if (changes['zIndex']) {
      this._infoBoxManager.setZIndex(this);
    }
    if (changes['content']) {
      this._infoBoxManager.setContent(this);
    }
    this._setInfoWindowOptions(changes);
  }

  private _setInfoWindowOptions(changes: {[key: string]: SimpleChange}) {
    let options: {[propName: string]: any} = {};
    let optionKeys = Object.keys(changes).filter(
        k => GoogleMapInfoBox._infoBoxOptionsInputs.indexOf(k) !== -1);
    optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
    this._infoBoxManager.setOptions(this, options);
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  toString(): string { return 'SebmGoogleMapInfoBox-' + this._id.toString(); }

  /** @internal */
  ngOnDestroy() { this._infoBoxManager.deleteInfoBox(this); }
}
