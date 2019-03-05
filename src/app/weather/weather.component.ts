import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from './services/weather.service';
import { City, CityImpl } from './interfaces/city.interface';
import { Weather } from './interfaces/weatherForecast.interface';
import { WeatherModeEnum } from './interfaces/weatherMode.enum';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherNowComponent } from './weather-now/weather-now.component';
import { WeatherDailyComponent } from './weather-daily/weather-daily.component';
import { Config, Param } from '../interfaces/ComponentConfig.class';
import { WidgetService } from '../services/widget.service';
import { ModeEnum } from '../dialogs/edit/mode.enum';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, AfterViewInit, OnDestroy {

  city: City;
  mode: WeatherModeEnum = WeatherModeEnum.Forecast;
  // @Input() config: Config;
  // @Input() Params: Param[];
  // _config: Config;
  // @Input() set config(config: Config) {
  //   this._config = config;
  // }
  // get config(): Config { return this._config; }
  // @Input() config: Config;
  _params: Param[];
  @Input() set params(params: Param[]) {
    this._params = params;
    if (params && params['city'] && params['mode']) {
      this.updateConfig();
    }
  }
  get params(): Param[] { return this._params; }

  @ViewChild('weatherForecast') weatherForecast: WeatherForecastComponent;
  @ViewChild('weatherDaily') weatherDaily: WeatherDailyComponent;
  @ViewChild('weatherNow') weather: WeatherNowComponent;
  subscriptions: Array<Subscription>;
  weatherModeEnum = WeatherModeEnum;


  constructor(private weatherService: WeatherService, private widgetService: WidgetService) {
  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    this.updateConfig();
  }

  init() {
    this.subscriptions = new Array<Subscription>();
  }

  updateConfig() {
    console.log('updateConfig config', this.params);
    if (this.params['mode']) {
      this.mode = this.params['mode'];
    } else {
      this.mode = WeatherModeEnum.Forecast;
    }
    if (this.params['city']) {
      this.city = new CityImpl(this.params['city'], 'FR');
      this.searchWeatherByCity(this.mode, this.city);
    }
    //   this.widgetService.params$.subscribe(p => {
    //   if (p) {
    //     console.log('WeatherCompoenent update config', this.params, p['city'], p['mode'], p);
    //     let paramTmp = p['city'];
    //     if (paramTmp) {
    //       this.city = new CityImpl(paramTmp, 'FR');
    //     }
    //     paramTmp = p['mode'];
    //     if (paramTmp) {
    //       this.mode = paramTmp;
    //     }
    //     if (this.city) {
    //       this.searchWeatherByCity(this.mode, this.city);
    //     }
    //   }
    // }
    // );
    console.log('WeatherComponent init city, mode', this.city, this.mode);

  }

  searchWeatherByCity(mode: WeatherModeEnum, city: City, nbDay?: number) {
    console.log('mode city', mode, city);
    switch (+mode) {
      case WeatherModeEnum.Forecast:
        console.log('weatherForecast city', mode, city, this.weatherForecast);
        if (this.weatherForecast) {
          this.weatherForecast.search(city);
        } else {
          console.error('weatherForecast not loaded', mode, city);
        }
        break;

      default:
        console.error('searchWeatherByCity not found mode city', mode, city);
        break;
    }
  }

  //   searchCity(name: string){
  //     return this.cities.filter(c => c.name.toLowerCase().startsWith(name.toLowerCase()));
  // }

  // getWeatherIcon(weather: Weather): Observable<string> {
  //   return this.weatherService.getWeatherIcon(weather);
  // }
  // TODO https://github.com/erikflowers/weather-icons

  async getImageByWeather(weather: Weather) {
    let response;
    const keywords: string = weather.description.split(' ').join('+');
    this.subscriptions.push(
      await this.weatherService.getImageByKeywords(keywords).subscribe(item => response = item)
    );
    console.log('getImageByWeather weather', weather, response);
    return response && response.hits && response.hits.length > 0 ? response.hits[0].largeImageURL : '';
  }

  onSubmit() {
    this.searchWeatherByCity(WeatherModeEnum.Forecast, new CityImpl(this.city.name, null));
    console.log('searchWeatherByCity', this.city);
  }

  ngOnDestroy() {
    // this.reset();
    console.log('ngOnDestroy WeatherComponent');
  }

}
