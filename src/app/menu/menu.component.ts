import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { Config } from '../interfaces/ComponentConfig.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Output() actionWidget: EventEmitter<Config> = new EventEmitter<Config>();
  private loading = true;
  @Input() config: Config[];

  private _disabled = false;
  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

  get disabled() {
    return this._disabled;
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('MenuComponent ngAfterViewInit');
    this.loading = false;
  }

  getWidgetList() {
    return this.config;
  }

  onActionWidget(event: Config) {
    if (!this.loading) {
      console.log('onActionWidget');
      this.actionWidget.emit(event);
    }
  }


}
