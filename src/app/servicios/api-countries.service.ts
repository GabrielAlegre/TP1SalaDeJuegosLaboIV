import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiCountriesService {
  constructor(private http: HttpClient) {}

//   async getPaises() {
//     try {
//       const response: any = await fetch('https://restcountries.com/v3.1/all');
//       const paises: any = await response.json();
//       return paises;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

  async getPaises() {
    try {
      const response: any = await fetch('https://restcountries.com/v3.1/all?fields=name,translations,flags');
      const paises: any = await response.json();
      return paises;
    } catch (error) {
      console.log(error);
    }
  }
}