import { Component, OnInit } from '@angular/core';
import { WidgetService } from './services/widget.service';
import { IComponentConfig } from './interfaces/ComponentConfig.class';
import { environment } from '../environments/environment';
import { WidgetEnum } from './interfaces/widget.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'letsgotodisplayclient';
  config: IComponentConfig[];

  constructor(private widgetService: WidgetService) {
    // this.widgetService.load();
    // this.config = this.widgetService.getComponentsConfig();
    // console.log('AppComponent loading');
  }

  ngOnInit() {
    this.widgetService.load().subscribe(data => {
      if (data && data.componentConfig) {
        this.config = data.componentConfig.filter((cc: IComponentConfig) => {
          return environment.widgets.indexOf(cc.key) !== -1;
        });
        console.log('WidgetService constructor componentsConfig', this.config);
      } else {
        console.error('load error', data);
      }
    });
  }

  public getComponentConfig(widgetEnum: WidgetEnum): IComponentConfig {
    console.log('getComponentConfig widgetEnum', WidgetEnum[widgetEnum], this.config);
    const _component: IComponentConfig = this.config.find(c => c.key === WidgetEnum[widgetEnum]);
    console.log('getComponentConfig widgetEnum', WidgetEnum[widgetEnum], _component);
    return _component;
  }

}
