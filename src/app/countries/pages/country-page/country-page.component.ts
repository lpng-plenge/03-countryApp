import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  //Country nulo ya que no se hará hasta que se vea un país
  public country?: Country;

  // Obtener el Url
  constructor( private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router,
  ){}

  // Navegar a la persona

  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id)),
    ).subscribe(
      country => {
        if (!country) return this.router.navigateByUrl('');
        return this.country = country;
        //return;
      }
    );

  }


  getTranslationKeys(): string[] {
    return this.country ? Object.keys(this.country.translations) : [];
  }


}
