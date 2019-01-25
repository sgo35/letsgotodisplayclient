export interface City {
    id?: number;
    name: string;
    coord?: Coord;
    country: string;
    population?: number;
}

export interface Coord {
    lat: number;
    lon: number;
}

export class CityImpl {
    id?: number;
    name: string;
    coord?: Coord;
    country: string;
    population?: number;

    constructor(
        name?: string,
        country?: string,
        coord?: Coord,
        id?: number,
        population?: number) {
        this.name = name;
        this.country = country;
        this.coord = coord;
        this.id = id;
        this.population = population;
    }
}
