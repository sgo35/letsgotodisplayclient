import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ClockModule } from '../clock/clock.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule
    , ClockModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
