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

export class CityImpl implements City {
    id?: number;
    name: string;
    coord?: Coord;
    country: string;
    population?: number;

    constructor(
        name?: string,
        country?: string,
        id?: number,
        coord?: Coord,
        population?: number) {
        this.name = name;
        this.country = country;
        this.coord = coord;
        this.id = id;
        this.population = population;
    }
}
