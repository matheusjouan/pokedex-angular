import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { Pokemon } from '../response/Pokemon';
import { ResultsPokemonResponse } from '../response/ResultsPokemonResponse';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private URL: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  public listAllPokemons(offsetPage: number): Observable<ResultsPokemonResponse> {
    return this.http.get<ResultsPokemonResponse>(`${this.URL}?offset=${offsetPage}&limit=20`).pipe(
      tap(res => {
        // Para cada retorno, faço uma nova requisição
        res.results.map((pokemon: Pokemon) => {
          this.getPokemon(pokemon.url).subscribe({
            next: (res) => pokemon.status = res
          })
        })
      })
    )
  }

  public getPokemon(url: string) : Observable<any> {
    return this.http.get<any>(url).pipe(
      map(res => res)
    );
  }
}
