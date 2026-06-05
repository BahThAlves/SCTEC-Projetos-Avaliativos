import { BaseValidator } from './baseValidator';
import {
  PokemonResponse,
  PokemonType,
  PokemonStats,
} from '../models/responsePokemon';

export class equipeValidator extends BaseValidator {
  static validate(value: unknown): PokemonResponse {
    if (!this.isObject(value)) {
      throw new Error('Type error');
    }
    if (!('_id' in value)) {
      throw new Error('Type error');
    }
    if (!('_name' in value)) {
      throw new Error('Type error');
    }
    if (!('_type' in value)) {
      throw new Error('Type error');
    }
    if (!('_stats' in value)) {
      throw new Error('Type error');
    }
    if (!this.isNumber(value._id)) {
      throw new Error('Type error');
    }
    if (!this.isString(value._name)) {
      throw new Error('Type error');
    }
    if (!Array.isArray(value._type)) {
      throw new Error('Type error');
    }
    if (!this.isObject(value._stats)) {
      throw new Error('Type error');
    }

    const types: PokemonType[] = value._type.map((t) => {
      if (!this.isObject(t)) {
        throw new Error('Type error');
      }
      if (!('typeName' in t)) {
        throw new Error('Type error');
      }
      if (!this.isString(t.typeName)) {
        throw new Error('Type error');
      }
      return new PokemonType(t.typeName);
    });

    const s = value._stats;
    if (!('hp' in s)) {
      throw new Error('Type error');
    }
    if (!('atk' in s)) {
      throw new Error('Type error');
    }
    if (!('def' in s)) {
      throw new Error('Type error');
    }
    if (!this.isNumber(s.hp)) {
      throw new Error('Type error');
    }
    if (!this.isNumber(s.atk)) {
      throw new Error('Type error');
    }
    if (!this.isNumber(s.def)) {
      throw new Error('Type error');
    }

    const stats = new PokemonStats(s.hp, s.atk, s.def);

    return new PokemonResponse(value._id, value._name, types, stats);
  }
}
