import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [ DecimalPipe ],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent { 
  country = input.required<Country>()
  currentYear(): number {
    return new Date().getFullYear();
  }
  
}

