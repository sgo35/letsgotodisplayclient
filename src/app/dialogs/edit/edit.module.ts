import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { CityModule } from 'src/app/weather/city/city.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule
    , FormsModule, ReactiveFormsModule
    , MatFormFieldModule, MatDialogModule, MatButtonModule
    , CityModule
  ]
  , entryComponents: [
    EditComponent
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
