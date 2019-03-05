import { Component, OnInit } from '@angular/core';
import { WidgetService } from './services/widget.service';
import { Config } from './interfaces/ComponentConfig.class';
import { environment } from '../environments/environment';
import { WidgetEnum } from './interfaces/widget.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'letsgotodisplayclient';
  configGroup: Config[];

  constructor(private widgetService: WidgetService) {
  }

  ngOnInit() {
    this.widgetService.load().subscribe(data => {
      if (data && data.componentConfig) {
        this.configGroup = data.componentConfig.filter((cc: Config) => {
          return environment.widgets.indexOf(cc.key) !== -1;
        });
        console.log('WidgetService constructor componentsConfig', this.configGroup);
      } else {
        console.error('load error', data);
      }
    });
  }

  public getConfig(widgetEnum: WidgetEnum): Config {
    const _component: Config = this.configGroup.find(c => c.key === WidgetEnum[widgetEnum]);
    if (!_component) {
      console.error('getConfig widgetEnum not found', WidgetEnum[widgetEnum], widgetEnum);
    }
    return _component;
  }

}
