import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  url: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  async getAllCountries(): Promise<Country[]> {
    return await this.http.get<Country[]>(this.url + '/all').toPromise();
  }

  async getCountryByName(name: string): Promise<Country[]> {
    return await this.http.get<Country[]>(this.url + '/name/' + name).toPromise();
  }
}
