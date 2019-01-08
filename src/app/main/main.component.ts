import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formGroup: FormGroup;
  @ViewChild('weatherComponent') weatherComponent: WeatherComponent;

  constructor(private fb: FormBuilder) {
  }

  search() {
    this.weatherComponent.searchWeatherByCity('forecast', this.formGroup.controls['city'].value);
  }


  ngOnInit() {
    this.formGroup =  this.fb.group({
      'city': 'Rennes'
    });
  }

}
