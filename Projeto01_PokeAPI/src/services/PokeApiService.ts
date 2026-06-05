import { pokemonValidator } from '../validators/pokemonValidator';

export async function buscarPokemonAPI(pokemon: string) {
  try {
    const urlBaseAPI = 'https://pokeapi.co/api/v2/pokemon/';
    const responseAPI = await fetch(`${urlBaseAPI}${pokemon}`);

    if (!responseAPI.ok) {
      throw new Error('Erro de busca... :<');
    }

    const body = await responseAPI.json();
    return pokemonValidator.validate(body);
  } catch (error) {
    console.log(error);
  }
}
