import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries: Country[]=[];
  public isLoading: boolean=false;
  public initialValue: string =''

  constructor(private countriesService:CountriesService ){}

  ngOnInit(): void {
    this.countries = this.countriesService.cache.byCountries.countries;
    this.initialValue = this.countriesService.cache.byCountries.term;
  }

  searchByCountry(term: string): void{
    this.isLoading = true;
    this.countriesService.searchCountry(term).subscribe( coutries =>{
      this.countries = coutries;
      this.isLoading = false;
    }
    );
  }
}
