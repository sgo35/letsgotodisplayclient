import { Rectangle } from 'ngx-widget-grid';

export interface Widget {
    rectangle: Rectangle;
    color?: string;
    text?: string;
    component?: any;
}

// export interface Widget {
//     top: number;
//     left: number;
//     height: number;
//     width: number;
//     color: string;
//     text?: string;
// }
