import { Country } from "../interfaces/country.interfaces";
import { RESTCountry } from "../interfaces/rest-countries.interface";



export class CountryMapper{

    // static RestCountry => Country
    static mapRestCountryToCountry( restCountry: RESTCountry): Country{
        return{
            capital: restCountry.capital?.join(","),
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? 'No Spanish Name',
            population: restCountry.population,
            subRegion: restCountry.subregion,
            region: restCountry.region
            
            
        }
    }

    // static RestCountry[] => Country[]
    static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[]): Country []{

        return restCountries.map(this.mapRestCountryToCountry)

    }
}