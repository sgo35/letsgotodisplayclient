import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { WidgetService } from '../services/widget.service';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule
    , MatButtonModule, MatIconModule
  ],
  providers: [
    WidgetService
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
