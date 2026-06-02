import { PokemonResponse } from '../class/class';

export async function buscarPokemonAPI(
  pokemon: string,
): Promise<Response | undefined> {
  try {
    const urlBaseAPI = 'https://pokeapi.co/api/v2/pokemon/';
    const responseAPI = await fetch(`${urlBaseAPI}${pokemon}`);

    if (!responseAPI.ok) {
      throw new Error('Erro de busca... :<');
    }

    return responseAPI;
  } catch (error) {
    console.log(error);
  }
}

export function montarResponseAPI(busca: Promise<Response | undefined>) {
  const pokemon = new PokemonResponse();
}
