import { Component, ViewChild } from '@angular/core';
import { Params } from './interfaces/params.interface';
import { WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'letsgotodisplayclient';
  params: Params = { city: 'Rennes' };
  city: string;
  @ViewChild('weatherComponent') weatherComponent: WeatherComponent;

  search(params: Params) {
    this.weatherComponent.searchWeatherByCity(params.city);
  }
}
