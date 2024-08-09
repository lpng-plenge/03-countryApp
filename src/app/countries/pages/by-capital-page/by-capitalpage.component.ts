import { Country } from '../../interfaces/country.interface';
import { CountriesService } from './../../services/countries.service';
import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'by-capitalpage',
  templateUrl: './by-capitalpage.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{


  public countries: Country[]=[];
  public isLoading: boolean=false;
  public initialValue: string =''

  constructor(private countriesService:CountriesService ){}

  ngOnInit(): void {
    this.countries = this.countriesService.cache.byCapital.countries;
    this.initialValue = this.countriesService.cache.byCapital.term;
  }

  searchByCapital(term: string): void{
    this.isLoading=true;
    this.countriesService.searchCapital(term).subscribe( coutries =>{
      this.countries = coutries;
      this.isLoading=false;
    }
    );
  }

}
