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
        throw new Error(`O Pokemon "${atual.name}" já está na sua equipe`);
      }
    }

    console.log('\n\n\n\nCapturando...');

    equipe.push(pokemon);
    await writeFile('./pc_box.json', JSON.stringify(equipe), {
      encoding: 'utf-8',
    });

    console.log('Capturado :D');
  } catch (error) {
    console.log(error);
  }
}

export async function removPokemon(pokemonResponse: string) {
  const equipe = await lerEquipe();

  if (!equipe || equipe.length === 0) {
    console.log('\n\n\n\nVocê não tem pokemons na sua equipe!');
    return;
  }

  console.log('\n\n\n\nSoltando pokemon...');
  const index = equipe.findIndex(
    (p) => p.name.toLowerCase() === pokemonResponse.toLowerCase(),
  );

  if (index === -1) {
    console.log(`Pokemon "${pokemonResponse}" não encontrado.`);
    return;
  }

  void equipe.splice(index, 1)[0];

  await writeFile('./pc_box.json', JSON.stringify(equipe), {
    encoding: 'utf-8',
  });
  console.log(`Pokemon removido da sua equipe :<`);
}

export async function listarEquipe() {
  const equipe = await lerEquipe();

  if (!equipe || equipe.length === 0) {
    console.log('\n\n\n\nVocê não tem pokemons na sua equipe!');
    return;
  }

  console.log('\n\n\n\nSua equipe:');
  for (const pokemon of equipe) {
    const tipos = pokemon.types.map((t) => t.typeName).join(', ');

    console.log(
      `#${String(pokemon.id)} - ${pokemon.name} | Tipos: ${tipos}    |    HP: ${String(pokemon.stats.hp)} | ATK: ${String(pokemon.stats.atk)} | DEF: ${String(pokemon.stats.def)}`,
    );
  }
}
