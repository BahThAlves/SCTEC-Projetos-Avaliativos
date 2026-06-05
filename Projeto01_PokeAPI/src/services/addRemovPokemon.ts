import { writeFile, readFile } from 'node:fs/promises';

import { buscarPokemonAPI } from './PokeApiService';
import { equipeValidator } from '../validators/equipeValidator';

export async function lerEquipe() {
  try {
    const equipeTxt = await readFile('./pc_box.json', {
      encoding: 'utf-8',
    });

    if (!equipeTxt.trim()) {
      return [];
    }

    const dados: unknown = JSON.parse(equipeTxt);

    if (!Array.isArray(dados)) {
      return [];
    }

    return dados.map((e) => equipeValidator.validate(e));
  } catch (error) {
    console.log(error);
  }
}

export async function addPokemon(pokemonResponse: string) {
  const equipe = await lerEquipe();
  const pokemon = await buscarPokemonAPI(pokemonResponse);

  if (!pokemon) {
    return;
  }

  if (!equipe) {
    await writeFile('./pc_box.json', JSON.stringify([pokemon]), {
      encoding: 'utf-8',
    });
    return;
  }

  try {
    for (const atual of equipe) {
      if (atual.id === pokemon.id) {
        throw new Error(`O Pokemon "${atual.name}" já está no database`);
      }
    }

    console.log('Capturando...');

    equipe.push(pokemon);
    await writeFile('./pc_box.json', JSON.stringify(equipe), {
      encoding: 'utf-8',
    });

    console.log('Capturado :D');
  } catch (error) {
    console.log(error);
  }
}
