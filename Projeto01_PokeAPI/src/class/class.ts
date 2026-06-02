class PokemonTypes {
  typeName: string;
}

class PokemonStats {
  baseHP: number;

  baseATK: number;

  baseDEF: number;
}

export class PokemonResponse {
  id: number;

  name: string;

  types: PokemonTypes[];

  stats: PokemonStats[];
}
