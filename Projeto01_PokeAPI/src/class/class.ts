export class PokemonType {
  constructor(public typeName: string) {}
}

export class PokemonStats {
  constructor(
    public hp: number,
    public atk: number,
    public def: number,
  ) {}
}

export class PokemonResponse {
  constructor(
    public id: number,
    public name: string,
    public types: PokemonType[],
    public stats: PokemonStats,
  ) {}
}
