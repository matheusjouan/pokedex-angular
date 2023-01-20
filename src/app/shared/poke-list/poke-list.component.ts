import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/response/Pokemon';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  @Input() pokemonsList: Pokemon[] = [];

  constructor() {}

  ngOnInit(): void {
  }

}
