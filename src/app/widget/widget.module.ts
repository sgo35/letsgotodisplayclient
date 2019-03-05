import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { WidgetService } from '../services/widget.service';
import { WidgetDirective } from './widget.directive';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

@NgModule({
  declarations: [
    WidgetComponent
  ],
  imports: [
    CommonModule
  ]
  , providers: [WidgetService]
  , exports: [WidgetComponent]
})
export class WidgetModule { }
