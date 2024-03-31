import { Country } from './../models/country';
import { CountriesService } from './../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { GuessValidatorService } from '../services/guess-validator.service';

@Component({
  selector: 'app-search-country',
  templateUrl: './search-country.component.html',
  styleUrls: ['./search-country.component.scss']
})
export class SearchCountryComponent implements OnInit {
  countries: Country[] = [];
  countriesNames: string[] = [];
  countryToGuessName: string = '';
  countryToGuess?: Country;
  guessedCountry: string = '';
  results: string[] = [];
  numberOfGuesses: number = 0;
  alreadyGuessedCountries: Country[] = [];

  constructor(private countriesService: CountriesService, private guessValidator: GuessValidatorService) { }

  async ngOnInit(): Promise<void> {
    console.log('!')
    this.countries = await this.countriesService.getAllCountries();
    for (const country of this.countries) {
      this.countriesNames.push(country.name.common.toLowerCase());
    }
    console.log('!')
    this.createNewRun();
    console.log('!')
  }

  search(event: any): void {
    this.results = [];
    const tempResults = this.countriesNames.filter(country => country.startsWith(event.query));
    if (tempResults.length > 0 && tempResults.length < 10)
    this.results = tempResults;
  }

  autocomplete(): void {
    if (this.results.length > 0) {
      this.guessedCountry = this.results[0];
    }
  }

  async validateGuess(): Promise<void> {
    // this.guessValidator.validateGuess(this.countriesNames, this.countryToGuess, this.guessedCountry);
    if (this.countriesNames.indexOf(this.guessedCountry) < 0) {
      alert('Not valid guess');
      this.setGuessEmpty();
      return;
    }
    if (this.guessedCountry.trim().toLowerCase() == this.countryToGuessName) {
      alert('Country guessed!')
      this.createNewRun();
    } else {
      alert(`Country not guessed, try again! ${this.getLeftGuesses()} guesses left`)
      this.numberOfGuesses++;
      await this.addGuessedCountries();
      this.setGuessEmpty();
    }
  }

  private async addGuessedCountries(): Promise<void> {
    const countries = await this.countriesService.getCountryByName(this.guessedCountry);
    const country = countries[0];
    this.alreadyGuessedCountries.unshift(country);
  }

  private async createNewRun(): Promise<void> {
    this.numberOfGuesses = 0;
    this.alreadyGuessedCountries = [];
    this.setGuessEmpty();
    await this.createRandomCountry();
  }

  private setGuessEmpty(): void {
    this.guessedCountry = '';
  }

  private getLeftGuesses(): number {
    return 8 - this.numberOfGuesses;
  }

  private async createRandomCountry(): Promise<void> {
    let randomNr = Math.floor((Math.random() * this.countries.length));
    this.countryToGuessName = this.countries[randomNr].name.common.trim().toLowerCase();
    const countriesToGuess = await this.countriesService.getCountryByName(this.countryToGuessName);
    this.countryToGuess = countriesToGuess[0];
  }

  getRegionClass(country: any): string {
    if (this.countryToGuess != undefined && this.countryToGuess.region == country.region) {
      return "pi pi-check";
    }
    return "pi pi-times";
  }

  getAreaClass(country: any): string {
    if (this.countryToGuess != undefined) {
      if (this.countryToGuess.area > country.area) {
        return "pi pi-arrow-up";
      }
      return "pi pi-arrow-down";
    }
    return "pi";
  }

  getPopulationClass(country: any): string {
    if (this.countryToGuess != undefined) {
      if (this.countryToGuess.population > country.population) {
        return "pi pi-arrow-up";
      }
      return "pi pi-arrow-down";
    }
    return "pi";
  }
}
