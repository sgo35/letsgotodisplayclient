import { City } from './city.interface';

export interface WeatherForecast {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}

export interface List {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    sys: Sys;
    dt_txt: string;
    rain?: Rain;
}

export interface Rain {
    '3h'?: number;
}

export interface Sys {
    pod: string;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Clouds {
    all: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}
