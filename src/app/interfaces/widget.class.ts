import { Rectangle } from 'ngx-widget-grid';
import { IComponentConfig } from './ComponentConfig.class';

export enum WidgetEnum { weather, news, canteen, transport, event, agenda, movie, tourism, stockExchange }

export interface IWidget {
    position: Rectangle;
    color?: string;
    text?: string;
    moveable: boolean;
    resizable: boolean;
    snapOnMove: boolean;
    componentConfig?: IComponentConfig;
}

export class Widget implements IWidget {
    position: Rectangle;
    color?: string;
    text?: string;
    moveable: boolean;
    resizable: boolean;
    snapOnMove: boolean;
    componentConfig?: IComponentConfig;

    constructor(position: Rectangle, text?: string, color?: string, _component?: IComponentConfig) {
        this.position = position;
        this.color = color ? color : this.generateHslaColors();
        this.text = text;
        this.componentConfig = _component;
    }

    public generateHslaColors(saturation?, lightness?, alpha?) {
        const h = this.getRandomIntInclusive(0, 360 * 10);
        const s = saturation >= 0 && saturation <= 100 ? saturation : 80;
        const l = lightness >= 0 && lightness <= 100 ? lightness : 80;
        const a = alpha >= 0 && alpha <= 100 ? alpha : 100;
        return `hsla(${h / 10},${s}%,${l}%,${a})`;
    }

    public getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const random = Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
        return random;
    }

}
