import { Component, ViewChild } from '@angular/core';
import { Params } from './interfaces/params.interface';
import { WeatherComponent } from './weather/weather.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'letsgotodisplayclient';
}
