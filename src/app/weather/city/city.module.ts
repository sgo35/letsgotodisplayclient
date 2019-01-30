import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './city.component';
import { MatExpansionModule
  , MatFormFieldModule
  , MatInputModule
  , MatButtonModule
  , MatButtonToggleModule
  , MatAutocompleteModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CityComponent],
  imports: [
    CommonModule
    , FormsModule, ReactiveFormsModule
    , MatButtonModule, MatButtonToggleModule
    , MatExpansionModule, MatFormFieldModule, MatInputModule
    , MatAutocompleteModule, MatProgressSpinnerModule
  ]
  , exports: [
    CityComponent
  ]
})
export class CityModule { }
