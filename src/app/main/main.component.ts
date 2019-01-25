import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';

import { WeatherComponent } from '../weather/weather.component';
import { WeatherModeEnum } from '../weather/interfaces/weatherMode.enum';
import { City, CityImpl } from '../interfaces/city.interface';
import { CityService } from '../city/services/city.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formGroup: FormGroup;
  weatherModeEnum = WeatherModeEnum;
  @ViewChild('weatherComponent') weatherComponent: WeatherComponent;
  filteredCities: Array<City>;
  isLoading = false;

  constructor(private fb: FormBuilder, private cityService: CityService) {
  }

  searchWeather(mode: WeatherModeEnum) {
    console.log('searchWeather mode', mode, this.formGroup.controls.city.value);
    let _city;
    if (this.formGroup.controls.city.value.id) {
      // City sélectionné
      _city = this.formGroup.controls.city.value;
    } else {
      const query: string = <string>this.formGroup.controls.city.value;
      const name: string = query;
      _city = new CityImpl(name);
    }
    this.weatherComponent.searchWeatherByCity(mode, _city);
  }


  ngOnInit() {
    this.formGroup = this.fb.group({
      'city': null
    });
    this.filteredCities = new Array<City>();
    this.isLoading = true;
    this.formGroup.controls.city.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => {
          console.log('city.valueChanges', value);
          return this.cityService.getfindCityByName(<string>value, 'FR')
            .pipe(
              finalize(() => this.isLoading = false),
            );
        }
        )
      )
      .subscribe(cities => this.filteredCities = cities);
    // this.cityService.getCities().subscribe(data => {
    //   console.log('cityService.getCities', data);
    //   this.cities = data;
    //   this.isLoading = false;
    // }, error => console.error('cityService error', error));
  }

  displayFn(city: City) {
    if (city) { return city.name + ' [' + city.country + ']'; }
  }

}
