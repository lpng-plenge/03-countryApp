import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {
  //API url
  private apiUrl: string = 'https://restcountries.com/v3.1'

  //Cache de la busqueda
  public cache: CacheStore ={
    byCapital:   {term:'', countries:[] },
    byCountries: {term:'', countries:[] },
    byRegion:    {region:'', countries:[] },
  }

  //Constructor del HttpClient
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem( 'countryCacheApp', JSON.stringify(this.cache));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('countryCacheApp')) return;

    this.cache = JSON.parse(localStorage.getItem('countryCacheApp')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([])),
      //delay(200)
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    const url= `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0]: null),
      catchError(() => of(null)
      )
    );
  }

  searchCapital(term: string): Observable<Country[]>{
    const url= `${this.apiUrl}/capital/${term}`;

    return this.getCountriesRequest(url)
    //almacenar la infromación en cache del servicio
    .pipe(
      tap((countries)=> this.cache.byCapital = {term,countries}),
      tap(() => this.saveLocalStorage() ),
    );

  }

  searchCountry(term: string): Observable<Country[]>{
    const url= `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url)
    //almacenar la infromación en cache del servicio
    .pipe(
      tap((countries)=> this.cache.byCountries = {term,countries}),
      tap(() => this.saveLocalStorage()),
    );
  }

  searchRegion(term: Region): Observable<Country[]>{
    const url= `${this.apiUrl}/region/${term}`;

    console.log(term);
    return this.getCountriesRequest(url)
    //almacenar la infromación en cache del servicio
    .pipe(
      tap((countries)=> this.cache.byRegion = {region: term ,countries}),
      tap(() => this.saveLocalStorage()),
    );
  }


}
