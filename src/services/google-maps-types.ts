export var google: any;

export interface GoogleMap {
  constructor(el: HTMLElement, opts?: MapOptions): void;
  panTo(latLng: LatLng | LatLngLiteral): void;
  setZoom(zoom: number): void;
  addListener(eventName: string, fn: Function): void;
  getCenter(): LatLng;
  setCenter(latLng: LatLng | LatLngLiteral): void;
  getZoom(): number;
  setOptions(options: MapOptions): void;
}

export interface LatLng {
  constructor(lat: number, lng: number): void;
  lat(): number;
  lng(): number;
}

export interface Marker {
  constructor(options?: MarkerOptions): void;
  setMap(map: GoogleMap): void;
  setPosition(latLng: LatLng | LatLngLiteral): void;
  setTitle(title: string): void;
  setLabel(label: string | MarkerLabel): void;
  setDraggable(draggable: boolean): void;
  setIcon(icon: string): void;
  getLabel(): MarkerLabel;
  addListener(eventType: string, fn: Function): void;
}

export interface MarkerOptions {
  position: LatLng | LatLngLiteral;
  title?: string;
  map?: GoogleMap;
  label?: string | MarkerLabel;
  draggable?: boolean;
  icon?: string;
}

export interface MarkerLabel {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export enum MapType {
  HYBRID,
  ROADMAP,
  SATELLITE,
  TERRAIN
}

export interface MouseEvent { latLng: LatLng; }

export interface MapOptions {
  center?: LatLng | LatLngLiteral;
  zoom?: number;
  disableDoubleClickZoom?: boolean;
  backgroundColor?: string;
  disableDefaultUI?: boolean;
  draggable?: boolean;
  draggableCursor?: string;
  draggingCursor?: string;
  heading?: number;
  keyboardShortcuts?: boolean;
  mapMaker?: boolean;
  mapTypeControl?: boolean;
  mapTypeControlOptions?: Object;
  mapTypeId?: MapType;
  maxZoom?: number;
  minZoom?: number;
  noClear?: boolean;
  overviewMapControl?: boolean;
  overviewMapControlOptions?: Object;
  panControl?: boolean;
  panControlOptions?: Object;
  rotateControl?: boolean;
  rotateControlOptions?: Object;
  scaleControl?: boolean;
  scaleControlOptions?: Object;
  scrollwheel?: boolean;
  streetView?: Object;
  streetViewControl?: boolean;
  streetViewControlOptions?: Object;
  styles?: Object[];
  tilt?: number;
  zoomControl?: boolean;
  zoomControlOptions?: Object;
}

export interface InfoWindow {
  constructor(opts?: InfoWindowOptions): void;
  close(): void;
  getContent(): string | Node;
  getPosition(): LatLng;
  getZIndex(): number;
  open(map?: GoogleMap, anchor?: MVCObject): void;
  setContent(content: string | Node): void;
  setOptions(options: InfoWindowOptions): void;
  setPosition(position: LatLng | LatLngLiteral): void;
  setZIndex(zIndex: number): void;
}

export interface MVCObject { constructor(): void; }

export interface Size {
  height: number;
  width: number;
  constructor(width: number, height: number, widthUnit?: string, heightUnit?: string): void;
  equals(other: Size): boolean;
  toString(): string;
}

export interface InfoWindowOptions {
  content?: string | Node;
  disableAutoPan?: boolean;
  maxWidth?: number;
  pixelOffset?: Size;
  position?: LatLng | LatLngLiteral;
  zIndex?: number;
}
