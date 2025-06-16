import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
   private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(nameOrId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon/${nameOrId}/`);
  }
}