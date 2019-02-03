import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { IComponentConfig, ComponentConfig } from '../interfaces/ComponentConfig.class';
import { WidgetEnum } from '../interfaces/widget.class';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Output() actionWidget: EventEmitter<IComponentConfig> = new EventEmitter<IComponentConfig>();
  private loading = true;
  @Input() config: IComponentConfig[];

  private _disabled = false;
  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

  get disabled() {
    return this._disabled;
  }

  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('MenuComponent ngAfterViewInit');
    this.loading = false;
  }

  // getComponentConfigByName(widgetName: string): IComponentConfig {
  //   let _componentConfig: IComponentConfig;
  //   console.log('getComponentConfigByName', event);
  //   switch (widgetName) {
  //     case WidgetEnum[WidgetEnum.weather]:
  //       _componentConfig = new ComponentConfig('WeatherComponent', 'Météo', 'ville de Bédée');
  //       break;
  //     case WidgetEnum[WidgetEnum.news]:
  //       _componentConfig = new ComponentConfig('NewsComponent', 'Actualité', 'ville de Bédée');
  //       break;
  //     case WidgetEnum[WidgetEnum.canteen]:
  //       _componentConfig = new ComponentConfig('CanteenComponent', 'Menu de cantine', 'ville de Bédée');
  //       break;
  //     default:
  //       _componentConfig = new ComponentConfig('OtherComponent', widgetName, '');
  //       break;
  //   }
  //   return _componentConfig;
  // }

  getWidgetList() {
    return this.config;
    // return this.widgetService.getComponentsConfig();
  }

  onActionWidget(event: IComponentConfig) {
    if (!this.loading) {
      console.log('onActionWidget');
      this.actionWidget.emit(event);
    }
  }


}
