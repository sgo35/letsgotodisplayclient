import { Component, OnInit, ViewChild } from '@angular/core';

import { WeatherComponent } from '../weather/weather.component';
import { WeatherModeEnum } from '../weather/interfaces/weatherMode.enum';
import { City } from '../interfaces/city.interface';
import { Rectangle, NgxWidgetGridComponent } from 'ngx-widget-grid';
import { Widget } from '../interfaces/widget.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  modeSelected: WeatherModeEnum;
  weatherModeEnum = WeatherModeEnum;
  weatherMode: WeatherModeEnum = WeatherModeEnum.Forecast;
  // sidenavOpen: boolean;
  rectangleDefault: Rectangle = new Rectangle({ top: 2, left: 2, height: 3, width: 2 });
  @ViewChild('weatherComponent') weatherComponent: WeatherComponent;
  @ViewChild('grid') grid: NgxWidgetGridComponent;
  public rows = 6;
  public cols = 6;
  public widgets: any[] = [];
  public showGrid = false;
  public swapWidgets = false;

  private _editable = false;
  public set editable(editable: boolean) {
    this._editable = editable;
    this.showGrid = editable;
  }

  public get editable() {
    return this._editable;
  }

  sidenavOpened: boolean;

  constructor() {
  }

  ngOnInit() {
    this.sidenavOpened = false;
  }

  onWidgetChange(event) {
    console.log('onWidgetChange', event);
  }

  onModeWeatherChange(event: WeatherModeEnum) {
    this.modeSelected = event;
    console.log('onModeWeatherChange mode', event);
  }

  onPositionChanged(event) {
    console.log('onPositionChanged', event);
    this.sidenavOpened = event;
  }

  changeWeatherMode(event) {
    this.weatherMode = event;
  }

  changeCity(event: City) {
    if (this.weatherComponent) {
      this.searchWeather(this.weatherMode, event);
    } else {
      console.error('changeCity weatherComponent not loaded', event);
    }
  }

  addWidget() {
    const nextPosition: Rectangle = this.grid.getNextPosition();
    if (nextPosition) {
      // const _widget = { color: this.generateHslaColors(), ...nextPosition };
      const _widget: any = { color: this.generateHslaColors(), ...nextPosition };

      this.widgets.push(_widget);
    } else {
      console.warn('No Space Available!! ');
    }
  }

  askDeleteWidget(index) {
    console.log('deleting', index);
    this.widgets.splice(index, 1);
  }

  generateHslaColors(saturation?, lightness?, alpha?) {
    const h = this.getRandomIntInclusive(0, 360 * 10);
    const s = saturation >= 0 && saturation <= 100 ? saturation : 80;
    const l = lightness >= 0 && lightness <= 100 ? lightness : 80;
    const a = alpha >= 0 && alpha <= 100 ? alpha : 100;
    return `hsla(${h / 10},${s}%,${l}%,${a})`;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const random = Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
    return random;
  }

  searchWeather(mode: WeatherModeEnum, _city: City) {
    console.log('searchWeather mode', mode, _city);
    this.weatherComponent.searchWeatherByCity(mode, _city);
  }

}
