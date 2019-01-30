import { City } from 'src/app/weather/interfaces/city.interface';

export interface WeatherDaily {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: List[];
}

export interface List {
  dt: number;
  temp: Temp;
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed: number;
  deg: number;
  clouds: number;
  rain: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
