import {
  Component, OnInit
  , ViewChild, Input
} from '@angular/core';

import { WeatherModeEnum } from '../weather/interfaces/weatherMode.enum';
import { City } from '../weather/interfaces/city.interface';
import { Rectangle, NgxWidgetGridComponent } from 'ngx-widget-grid';
import { IFrameWidget, WidgetEnum, FrameWidget } from '../interfaces/widget.interface';
import { EditComponent } from '../dialogs/edit/edit.component';
import { ModeEnum } from '../dialogs/edit/mode.enum';
import { MatDialog } from '@angular/material';
import { Config, Param } from '../interfaces/ComponentConfig.class';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() config: Config[];
  @ViewChild('grid') grid: NgxWidgetGridComponent;
  // @ViewChildren(WidgetComponent) widgetViewChildren: QueryList<WidgetComponent>;
  // @ContentChildren('layout') _layout: ElementRef;
  // @ViewChild(WidgetDirective) widgetDirective: WidgetDirective;
  // @ViewChild('weatherComponent') weatherComponent: WeatherComponent;
  // @ViewChild('widgetcontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  city: City;
  modeSelected: WeatherModeEnum;
  weatherModeEnum = WeatherModeEnum;
  weatherMode: WeatherModeEnum = WeatherModeEnum.Forecast;
  // sidenavOpen: boolean;
  // rectangleDefault: Rectangle = new Rectangle({ top: 2, left: 2, height: 3, width: 2 });
  rows = 6;
  cols = 6;
  widgets: IFrameWidget[];
  // widgets: NgxWidgetGridComponent;
  showGrid = false;
  swapWidgets = true;
  sidenavOpened = false;
  // componentRef: any;

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

  constructor(
    public dialog: MatDialog
    , private _clipboardService: ClipboardService
  ) {
    // console.log('MainComponent', widgetService.getComponentsConfig());
  }

  ngOnInit() {
    this.widgets = [];
    // this.editable = true;
    const _config: Config = this.config.find(c => c.key === WidgetEnum[WidgetEnum.weather]);
    console.log('MainComponent ngOnInit', _config);
    this.addWidget(_config);
    if (!this.grid.getNextPosition()) {
      this.isFullScreen = true;
    }
  }

  copy(widget: IFrameWidget) {
    console.log('copy widget', widget);
    this._clipboardService.copyFromContent(JSON.stringify(widget));
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

  addWidget(_config: Config) {
    // console.log('addWidget widgetEnum', WidgetEnum[widgetEnum]);

    // const _component: ComponentConfig = this.widgetService.getComponentConfig(widgetEnum);
    // new ComponentConfig('WeatherComponent', 'Météo', 'ville de Bédée');
    const _nextPosition: Rectangle = this.grid.getNextPosition();
    if (_nextPosition) {
      _config.index = this.widgets.length > 0 ? Math.max(...this.widgets.map(w => w.config.index)) + 1 : 1;
      const frameWidget: IFrameWidget = new FrameWidget(
        _nextPosition
        , { ..._config }
        , _config && _config.params ? { ..._config.params } : _config.params
      );
      this.widgets.push(frameWidget);
      console.log('MainComponent addWidget', frameWidget, _config);
    } else {
      console.warn('No Space Available!! ');
    }
  }

  askDeleteWidget(index: number) {
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

  editWidget(index: number) {
    // index row is used just for debugging proposes and can be removed
    const params = this.widgets[index].params;
    console.log('editWidget config, params', index, this.widgets[index].config, params);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        mode: ModeEnum.UPDATE,
        params: { ...params }
      }
    });
    // console.log('dialog UPDATE afterClose result data', this.filterService.getDialogData());

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.params) {
        this.widgets[index].params = result.params;
      }
      console.log('dialogRef.afterClosed', result, this.widgets[index]);
    });

  }

  refreshWidget(data: any) {
    console.log('refreshWidget', data);
  }

}
