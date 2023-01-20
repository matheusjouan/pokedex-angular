import { Pokemon } from "./Pokemon";

export interface ResultsPokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
