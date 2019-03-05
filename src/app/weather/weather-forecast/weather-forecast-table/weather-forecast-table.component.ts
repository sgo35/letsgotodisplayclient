import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WeatherList, Weather, Rain, Wind } from '../../interfaces/weatherForecast.interface';
import { WeatherService } from '../../services/weather.service';
import { GroupWeather, Column } from './groupWeather.class';
import { WeatherDayEnum } from './weatherDayEnum.enum';
import { PagerService } from 'src/app/services/pager.service';


// const WEATHER_DAY: WeatherDay[] = [];
// const WEATHER_DAY: WeatherDay[] = [
//   { date: '', picto: 'http://openweathermap.org/img/w/02d.png', name: 'Hydrogen', weight: 1.0079, symbol: 'H' }
//   { 'dt': 1550372400
// , 'main': {
// 'temp': 5.12
// , 'temp_min': 5.12
// , 'temp_max': 5.89
// , 'pressure': 1023.42
// , 'sea_level': 1032.06
// , 'grnd_level': 1023.42
// , 'humidity': 69
// , 'temp_kf': 0
// }
// , 'weather': [{ 'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02n' }]
// , 'clouds': { 'all': 12 }
// , 'wind': { 'speed': 5.86, 'deg': 164 }
// , 'sys': { 'pod': 'n' }
// , 'dt_txt': '2019-02-17 03:00:00' }

// ];



@Component({
  selector: 'app-weather-forecast-table',
  templateUrl: './weather-forecast-table.component.html',
  styleUrls: ['./weather-forecast-table.component.css']
})
export class WeatherForecastTableComponent implements OnInit {

  @Input() weatherForecastList: Array<WeatherList>;
  weatherDayEnum = WeatherDayEnum;
  // displayedColumns: string[];
  // displayedRows: { [key: number]: any[] };
  groupWeather: GroupWeather;
  daySelected: number;

  static generateHeaders(item: Array<string>) {
    const _displayedColumns: string[] = ['title'];
    item.forEach((i, idx, array) => {
      _displayedColumns.push('day' + (idx + 1));
    });
    // console.log('generateHeaders', _displayedColumns, item);
    return _displayedColumns;
  }

  static generateColumns(item: Array<string>) {
    // Première colonne
    const columns: Column[] = [{
      columnDef: 'title',
      header: 'Titre',
      cell: []
    }];

    item.forEach((i, idx, array) => {
      columns.push({
        columnDef: 'day' + (idx + 1),
        header: i,
        cell: []
      });
    });

    // console.log('generateColumns', columns, item);
    return columns;
  }


  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    // console.log('ngOnInit weatherForecastList', this.weatherForecastList);
    this.groupWeather = new GroupWeather(this.weatherForecastList);
    this.daySelected = 0;
    this.generateTable();
  }

  generateTable() {
    const day: number = this.daySelected + 1;
    if (this.groupWeather) {
      if (this.groupWeather.entityColumns && this.groupWeather.entityColumns[day].length > 0) {
        if (this.groupWeather.entityRows && this.groupWeather.entityRows[day].length > 0) {
          this.groupWeather.displayedColumns = WeatherForecastTableComponent.generateHeaders(this.groupWeather.entityColumns[day]);
          this.groupWeather.columns = WeatherForecastTableComponent.generateColumns(this.groupWeather.entityColumns[day]);
          this.groupWeather.dataSubject.next(this.buildTableRow(day));
        } else {
          console.error('groupWeather.entityRows empty');
        }
      } else {
        console.error('groupWeather.entityColumns empty');
      }
    } else {
      console.error('groupWeather empty');
    }
  }

  buildTableRow(day: number): any[] {
    const tableData: Array<any> = new Array<any>();
    let tableRow: Array<any> = new Array<any>();
    const keys = Object.keys(WeatherDayEnum).filter(k => typeof WeatherDayEnum[k as any] !== 'number');
    // const keys = Object.keys(WeatherDayEnum).filter(k => typeof WeatherDayEnum[k as any] === 'number');
    // const values = keys.map(k => WeatherDayEnum[k as any]);
    keys.forEach(k => {
      const options = { weekday: 'long' };
      tableRow.push(+k === WeatherDayEnum.date ? new Intl.DateTimeFormat('fr-FR', options).format(
        this.getDateTime(this.groupWeather.entityRows[day][0].dt))
        : WeatherDayEnum[k]);
      const BreakException = {};
      try {
        switch (+k) {
          case WeatherDayEnum.date:
            tableRow = tableRow.concat(this.groupWeather.entityRows[day].map(e => e.dt));
            break;
          case WeatherDayEnum.picto:
            tableRow = tableRow.concat(this.groupWeather.entityRows[day].map(e => e.weather[0]));
            break;
          case WeatherDayEnum.precipitation:
            tableRow = tableRow.concat(this.groupWeather.entityRows[day].map(e => e.rain ? e.rain['3h'] : 0.0));
            break;
          case WeatherDayEnum.temperature:
            tableRow = tableRow.concat(this.groupWeather.entityRows[day].map(e => e.main && e.main.temp ? e.main.temp : '?'));
            break;
          case WeatherDayEnum.wind:
            tableRow = tableRow.concat(this.groupWeather.entityRows[day].map(e => e.wind ? e.wind : '?'));
            break;
          default:
            break;
        }
      } catch (e) {
        if (e !== BreakException) { throw e; }
      }
      if (tableRow.length > 1) { // au moins 1 donnée
        // console.log('generateTable index tableRow', k, tableRow);
        tableData.push(tableRow);
      } else {
        // console.log('tableRow', tableRow);
      }
      tableRow = [];
    });
    // console.log('buildTableRow day tableData', day, tableData);
    return tableData;
  }

  getDateTime(dt): Date {
    return WeatherService.getDateTime(dt);
  }

  getColour(value, min, max): string {
    return WeatherService.getColour(value, min, max);
  }

  getWeatherIconUrl(weather: Weather) {
    return this.weatherService.getWeatherIconUrl(weather);
  }

  getWindKmHour(weather: Wind): number {
    return WeatherService.getWindKmHour(weather);
  }

  isDateDiff(dt_before: number, dt_current: number): boolean {
    return WeatherService.isDateDiff(dt_before, dt_current);
  }

  getDataFromAttribute(field: WeatherDayEnum): any[] {
    let result: any[] = [WeatherDayEnum[field]];
    result = result.concat(this.weatherForecastList.map(w => {
      switch (field) {
        case WeatherDayEnum.date:
          return this.getDateTime(w.dt);
        case WeatherDayEnum.picto:
          return this.getWeatherIconUrl(w.weather[0]);
        case WeatherDayEnum.precipitation:
          return w.rain ? w.rain['3h'] : 0;
        case WeatherDayEnum.temperature:
          return w.main ? w.main.temp : 0;
        case WeatherDayEnum.wind:
          return w.wind;
        default:
          console.log('getDataFromAttribute attribut non géré', field);
          break;
      }
    }));
    return result;
  }

  selectionChanged(item) {
    this.daySelected = Number(item.value);
    console.log('Selected day : ' + this.daySelected + 1);
    this.generateTable();
  }
}
