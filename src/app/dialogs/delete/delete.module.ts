import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete.component';

@NgModule({
  declarations: [DeleteComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DeleteComponent
  ]
})
export class DeleteModule { }
