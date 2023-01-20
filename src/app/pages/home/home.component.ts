import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/Pagination';
import { Pokemon } from 'src/app/response/Pokemon';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemons: Pokemon[] = [];
  apiError: boolean = false;
  paginationProps: Pagination = {} as Pagination;

  isLoading: boolean = true;
  offsetPage: number = 0;

  private setPokemons: Pokemon[] = [];

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.getAllPokemonsList();
  }

  public getAllPokemonsList(): void {
    this.pokeApiService.listAllPokemons(this.offsetPage).subscribe({
      next: (res) => {
        this.isLoading = true;
        this.setPokemons = res.results;
        this.pokemons = this.setPokemons;
        this.paginationProps = new Pagination(res.count, res.next, res.previous);
        this.isLoading = false;
      },
      error: () => {
        this.apiError = true;
      }
    })
  }

  public getPokemonNameSearch(pokemonName: string) {
    const pokemonFilter = this.setPokemons.filter(p => {
      return !p.name.indexOf(pokemonName.toLocaleLowerCase());
    });

    this.pokemons = pokemonFilter;
  }

  public setOffsetPage(offsetPage: number) {
    this.offsetPage = offsetPage;
    this.getAllPokemonsList();
  }
}
