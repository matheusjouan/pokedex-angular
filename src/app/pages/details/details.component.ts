import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string =  'https://pokeapi.co/api/v2/pokemon-species';

  pokemon: any;
  isLoading: boolean = false;
  apiError: boolean = false;

  constructor(private activedRouter: ActivatedRoute,
              private pokeApiService: PokeApiService,
              private location: Location) {}

  ngOnInit(): void {
    this.getPokemonInfo;
  }

  get getPokemonInfo() {
    const id = this.activedRouter.snapshot.params['id'];
    const pokemon = this.pokeApiService.getPokemon(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.getPokemon(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe({
      next: (res) => {
        this.pokemon = res;
        this.isLoading = true;
      },
      error: () => {
        this.apiError = true;
      }
    })
  }

  public goBack() {
    this.location.back();
  }
}
