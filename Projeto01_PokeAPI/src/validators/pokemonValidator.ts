import { BaseValidator } from './baseValidator';
import {
  PokemonResponse,
  PokemonType,
  PokemonStats,
} from '../models/responsePokemon';

interface StatEntry {
  base_stat: number;
  stat: { name: string };
}

export class pokemonValidator extends BaseValidator {
  static validate(value: unknown): PokemonResponse {
    if (!this.isObject(value)) {
      throw new Error('Type error');
    }

    if (!('id' in value)) {
      throw new Error('Type error');
    }

    if (!('name' in value)) {
      throw new Error('Type error');
    }

    if (!('stats' in value)) {
      throw new Error('Type error');
    }

    if (!('types' in value)) {
      throw new Error('Type error');
    }

    if (!this.isNumber(value.id)) {
      throw new Error('Type error');
    }

    if (!this.isString(value.name)) {
      throw new Error('Type error');
    }

    if (!Array.isArray(value.types)) {
      throw new Error('Type error');
    }

    if (!Array.isArray(value.stats)) {
      throw new Error('Type error');
    }

    const types: PokemonType[] = value.types.map((t) => {
      if (!this.isObject(t)) {
        throw new Error('Type error');
      }
      if (!('type' in t)) {
        throw new Error('Type error');
      }

      const typeOBJ = t.type;
      if (!this.isObject(typeOBJ)) {
        throw new Error('Type error');
      }
      if (!('name' in typeOBJ)) {
        throw new Error('Type error');
      }
      if (!this.isString(typeOBJ.name)) {
        throw new Error('Type error');
      }
      return new PokemonType(typeOBJ.name);
    });

    const isStatEntry = (s: unknown): s is StatEntry =>
      this.isObject(s) &&
      'base_stat' in s &&
      this.isNumber((s as StatEntry).base_stat) &&
      'stat' in s &&
      this.isObject((s as StatEntry).stat) &&
      'name' in (s as StatEntry).stat &&
      this.isString((s as StatEntry).stat.name);

    const findStat = (name: string): number => {
      const s = (value.stats as unknown[]).find(
        (stat): stat is StatEntry =>
          isStatEntry(stat) && stat.stat.name === name,
      );
      if (!s) throw new Error(`Missing stat: ${name}`);
      return s.base_stat;
    };

    const stats = new PokemonStats(
      findStat('hp'),
      findStat('attack'),
      findStat('defense'),
    );

    return new PokemonResponse(value.id, value.name, types, stats);
  }
}
