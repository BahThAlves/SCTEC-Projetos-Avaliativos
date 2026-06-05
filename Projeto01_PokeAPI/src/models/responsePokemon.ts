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
    private _id: number,
    private _name: string,
    private _type: PokemonType[],
    private _stats: PokemonStats,
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get types(): PokemonType[] {
    return this._type;
  }

  get stats(): PokemonStats {
    return this._stats;
  }
}
