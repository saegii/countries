import { Name } from './name';

export interface Country {
    name: Name,
    capital: string[],
    region: string,
    area: number,
    population: number
}