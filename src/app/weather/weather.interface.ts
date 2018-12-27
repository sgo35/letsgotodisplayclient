export interface ApiWeather {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
}

export interface Coord {
    lat: number;
    lon: number;
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
