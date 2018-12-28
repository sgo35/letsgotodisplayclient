export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population?: number;
}

export interface Coord {
    lat: number;
    lon: number;
}

