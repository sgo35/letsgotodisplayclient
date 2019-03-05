import { Rectangle } from 'ngx-widget-grid';
import { Config, Param } from './ComponentConfig.class';

export enum WidgetEnum { weather, news, canteen, transport, event, agenda, movie, tourism, stockExchange }

export interface IFrameWidget {
    position: Rectangle;
    config: Config;
    params: Param[];
    color?: string;
    text?: string;
    moveable: boolean;
    resizable: boolean;
    snapOnMove: boolean;
}

export class FrameWidget implements IFrameWidget {

    position: Rectangle;
    config: Config;
    params: Param[];
    color?: string;
    text?: string;
    moveable: boolean;
    resizable: boolean;
    snapOnMove: boolean;

    static generateHslaColors(saturation?, lightness?, alpha?) {
        const h = FrameWidget.getRandomIntInclusive(0, 360 * 10);
        const s = saturation >= 0 && saturation <= 100 ? saturation : 80;
        const l = lightness >= 0 && lightness <= 100 ? lightness : 80;
        const a = alpha >= 0 && alpha <= 100 ? alpha : 100;
        return `hsla(${h / 10},${s}%,${l}%,${a})`;
    }

    static getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const random = Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
        return random;
    }

    constructor(
        position: Rectangle
        , config: Config
        , params: Param[]
        , color?: string
        , text?: string
        , moveable?: boolean
        , resizable?: boolean
        , snapOnMove?: boolean
    ) {
        this.position = position;
        this.config = config;
        this.params = params;
        this.color = color ? color : FrameWidget.generateHslaColors();
        this.text = text;
        this.moveable = moveable ? moveable : true;
        this.resizable = resizable ? resizable : true;
        this.snapOnMove = snapOnMove ? snapOnMove : true;

    }


}


