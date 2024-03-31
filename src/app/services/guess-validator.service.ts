import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuessValidatorService {

  constructor() { }

  validateGuess(countriesNames: string[], countryToGuess: string, guessedCountry: string): void {
    // if (countriesNames.indexOf(guessedCountry) < 0) {
    //   alert('Not valid guess');
    //   setGuessEmpty();
    //   return;
    // }
    // if (guessedCountry.trim().toLowerCase() == countryToGuess) {
    //   alert('Country guessed!')
    //   createNewRun();
    // } else {
    //   alert('Country not guessed, try again!')
    //   setGuessEmpty();
    // }
  }
}
