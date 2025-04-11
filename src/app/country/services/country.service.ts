import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interfaces';
import { CountryMapper } from '../mappers/country.mappers';
import { Region } from '../interfaces/region.type';


const API_URL = 'https://restcountries.com/v3.1'


@Injectable({
  providedIn: 'root'
})


export class CountryService {

  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<Region, Country[]>()

  searchByCapital( query: string): Observable<Country[]>{
    query = query.toLowerCase()

    if (this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? [])
    }

    console.log(`Llegando al servidor por ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${ query }`).pipe(
      map( resp =>  CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheCapital.set(query, countries)),
      catchError((error) => {
        console.log('Error fetching ',error)
        return throwError(() => new Error(`No se pudo obtener paises con ese query ${query}`))
      })
    )

  }

  searchByCountry( query: string ){
    query = query.toLowerCase()

    if (this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query) ?? [])
    }
    console.log(`Llegando al servidor por ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${ query }`).pipe(
      map( resp =>  CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching ',error)
        return throwError(() => new Error(`No se pudo obtener paises con ese query ${query}`))
      })
    )
  }
  searchCountryByAlphaCode( code: string ){

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${ code }`).pipe(
      map( (resp) =>  CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map( countries => countries.at(0)),

      catchError((error) => {
        console.log('Error fetching ',error)
        return throwError(() => new Error(`No se pudo obtener paises con ese codigo ${code}`))
      })
    )
  }

  searchByRegion( region: Region ){
    const url = `${API_URL}/region/${region}`;
    

    if (this.queryCacheCountry.has(region)){
      return of(this.queryCacheCountry.get(region) ?? [])
    }
    console.log(`Llegando al servidor por ${region}`)

    return this.http.get<RESTCountry[]>(url).pipe(
      map( resp =>  CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheCountry.set(region, countries)),
      catchError((error) => {
        console.log('Error fetching ',error)
        return throwError(() => new Error(`No se pudo obtener paises con ese query ${region}`))
      })
    )
  }
}
