import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Input } from '@angular/core';

import { WeatherComponent } from '../weather/weather.component';
import { WeatherModeEnum } from '../weather/interfaces/weatherMode.enum';
import { City } from '../weather/interfaces/city.interface';
import { Rectangle, NgxWidgetGridComponent, NgxWidgetComponent } from 'ngx-widget-grid';
import { Widget, IWidget, WidgetEnum } from '../interfaces/widget.class';
import { EditComponent } from '../dialogs/edit/edit.component';
import { ModeEnum } from '../dialogs/edit/mode.enum';
import { MatDialog } from '@angular/material';
import { IComponentConfig } from '../interfaces/ComponentConfig.class';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  // @ViewChild('weatherComponent') weatherComponent: WeatherComponent;
  @ViewChild('grid') grid: NgxWidgetGridComponent;
  @ViewChild('widgetcontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  @Input() config: IComponentConfig[];

  city: City;
  modeSelected: WeatherModeEnum;
  weatherModeEnum = WeatherModeEnum;
  weatherMode: WeatherModeEnum = WeatherModeEnum.Forecast;
  // sidenavOpen: boolean;
  // rectangleDefault: Rectangle = new Rectangle({ top: 2, left: 2, height: 3, width: 2 });
  rows = 6;
  cols = 6;
  widgets: IWidget[] = [];
  showGrid = false;
  swapWidgets = true;
  sidenavOpened = false;
  componentRef: any;

  private _editable = false;
  set editable(editable: boolean) {
    this._editable = editable;
    this.showGrid = editable;
  }

  get editable() {
    return this._editable;
  }

  private _isFullScreen;
  set isFullScreen(_isFullScreen: boolean) {
    this._isFullScreen = _isFullScreen;
  }

  get isFullScreen() {
    return this._isFullScreen;
  }

  constructor(public dialog: MatDialog
    , private resolver: ComponentFactoryResolver
    , private widgetService: WidgetService
  ) {
    // console.log('MainComponent', widgetService.getComponentsConfig());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.grid.getNextPosition()) {
      this.isFullScreen = true;
    }
    // *** Pour test
    this.editable = true;
    this.addWidget(this.config.find(c => c.key === WidgetEnum[WidgetEnum.weather]));
    // ***
  }
  isActionnable() {
    return !this.editable && !this.isFullScreen;
  }

  onWidgetChange(event) {
    console.log('onWidgetChange', event);
  }

  onModeWeatherChange(event: WeatherModeEnum) {
    this.modeSelected = event;
    console.log('onModeWeatherChange mode', event);
  }

  onActivateEdit(event: boolean) {
    this.editable = event;
  }

  onPositionChanged(event) {
    console.log('onPositionChanged', event);
    this.sidenavOpened = event;
    if (this.sidenavOpened) {
      this.editable = true;
    }
  }

  // changeWeatherMode(event) {
  //   this.weatherMode = event;
  // }

  // changeCity(event: City) {
  //   this.city = event;
  //   if (this.weatherComponent) {
  //     this.searchWeather(this.weatherMode, event);
  //   } else {
  //     console.error('changeCity weatherComponent not loaded', event);
  //   }
  // }

  addWidget(_component: IComponentConfig) {
    // console.log('addWidget widgetEnum', WidgetEnum[widgetEnum]);

    // const _component: IComponentConfig = this.widgetService.getComponentConfig(widgetEnum);
    // new ComponentConfig('WeatherComponent', 'Météo', 'ville de Bédée');
    const _nextPosition: Rectangle = this.grid.getNextPosition();
    if (_nextPosition) {
      // const _widget = { color: this.generateHslaColors(), ...nextPosition };
      const _widget: IWidget = new Widget(_nextPosition, undefined, undefined, _component);
      console.log('addWidget', _widget);
      this.widgets.push(_widget);
    } else {
      console.warn('No Space Available!! ');
    }
  }

  askDeleteWidget(index) {
    console.log('deleting', index);
    this.widgets.splice(index, 1);
  }

  resetWidgets() {
    console.log('deleting all');
    this.widgets = [];
    this.isFullScreen = false;
  }


  // searchWeather(mode: WeatherModeEnum, _city: City) {
  //   console.log('searchWeather mode', mode, _city);
  //   this.weatherComponent.searchWeatherByCity(mode, _city);
  // }

  onGridFull(e: boolean) {
    this.isFullScreen = e;
    console.log('onGridFull', e, this.isFullScreen);
  }

  editWidget(i: number, param: any) {
    // index row is used just for debugging proposes and can be removed
    console.log('widget', i, param);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        mode: ModeEnum.UPDATE,
        param: { ...param }
      }
    });
    // console.log('dialog UPDATE afterClose result data', this.filterService.getDialogData());

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialogRef.afterClosed', result);
      // if (result === 1 && this.widgetService.getDialogData()) {
      //   const _paramTmp: any = this.widgetService.getDialogData().param as any;
      //   const data = [];
      //   this.refreshWidget(data);
      // }
    });

  }

  refreshWidget(data: any) {
    console.log('refreshWidget', data);
  }


  createComponent(message) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(NgxWidgetComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.message = message;
  }

  destroyComponent() {
    this.componentRef.destroy();
  }

}
