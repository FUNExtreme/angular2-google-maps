import { LatLng, LatLngLiteral, GoogleMap, Size } from './google-maps-types';

export interface InfoBox {
    constructor(options: InfoBoxOptions) : void;
    close() : void;
    draw() : void;
    getContent() : string;
    getPosition() :	LatLng;
    getVisible() : boolean;
    getZIndex() : number;
    onRemove() : void;
    open(map:any, anchor?:any) : void;
    setContent(content:string|Node)	: void;
    setOptions(opt_opts:InfoBoxOptions)	: void;
    setPosition(latlng:LatLng | LatLngLiteral) : void;
    setVisible(isVisible:boolean) : void;
    setZIndex(index:number)	: void;
}

export interface InfoBoxOptions {
    content?: string | Node,
    boxStyle?: InfoBoxStyle,
    disableAutoPan?: boolean,
    pixelOffset?: Size,
    position?: LatLng | LatLngLiteral,
    closeBoxURL?: string,
    isHidden?: boolean,
    pane?: string,
    enableEventPropagation?: boolean
}

export interface InfoBoxStyle {
    border: string,
    textAlign: string,
    fontSize: string,
    width: string,
    color: string
}