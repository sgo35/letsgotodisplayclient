import {
  Component
  , OnInit, Input
  , Output, EventEmitter
  , ViewContainerRef, ViewChild, Compiler, AfterViewInit
} from '@angular/core';
import { Config } from '../interfaces/ComponentConfig.class';
import { GenericWidgetModule } from '../generic-widget/generic-widget.module';
import { WidgetService } from '../services/widget.service';

export enum ActionEnum { edit, delete }

export interface EventWidget {
  action: ActionEnum;
  params: any;
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit, AfterViewInit {

  // _config: Config;
  // @Input() set config(_config: Config) { this._config = _config; }
  // get config() { return this._config; }

  @Input() config: Config;
  @Output() eventWidget: EventEmitter<EventWidget>;
  @ViewChild('widgetcontainer', { read: ViewContainerRef }) widgetcontainer: ViewContainerRef;
  componentRef: any;

  constructor(private compiler: Compiler, private widgetService: WidgetService) {
  }

  ngOnInit() {
    this.widgetService.initParams(this.config.params);
    this.eventWidget = new EventEmitter<EventWidget>();
    console.log('WidgetComponent init', this.config);
  }

  ngAfterViewInit(): void {
    this.createComponent(this.config);
    console.log('WidgetComponent ngAfterViewInit', this.config, this.widgetcontainer);
  }


  editWidget() {
    const _emitter = { action: ActionEnum.edit, params: { index: this.config.index } };
    console.log('WidgetComponent editWidget', _emitter);
    this.eventWidget.emit(_emitter);
  }

  askDeleteWidget() {
    const _emitter = { action: ActionEnum.delete, params: { index: this.config.index } };
    console.log('WidgetComponent askDeleteWidget', _emitter);
    this.eventWidget.emit(_emitter);
  }

  createComponent(_config: Config) {
    // @Component({ config: _config });
    const mod = this.compiler.compileModuleAndAllComponentsSync(GenericWidgetModule);
    const factory = mod.componentFactories.find((comp) =>
      comp.selector === 'app-' + _config.key
    );
    console.log('factory', factory, _config);
    const component = this.widgetcontainer.createComponent(factory);
    // component.instance.config = _config;
    component.instance.params = _config.params;

    // const _widget: ComponentConfig = new ComponentConfig(WidgetComponent, _config);
    // console.log('createComponent', _widget);
    // const factory = this.resolver.resolveComponentFactory(_widget.component);
    // // this.componentRef.instance.message = message;

    // // const viewContainerRef = this.widgetDirective.viewContainer;
    // this.viewContainerRef.clear();

    // const componentRef = this.viewContainerRef.createComponent(factory, 0);
    // (<WidgetComponent>componentRef.instance).config = _widget.config;

  }

  // destroyComponent() {
  //   this.componentRef.destroy();
  // }

}
