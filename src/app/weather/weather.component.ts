import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from './weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  data: Weather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getfindByCity('Rennes').subscribe(
      data => {
        console.log('data', data);
        this.data = data;
      }
    );
  }

}
