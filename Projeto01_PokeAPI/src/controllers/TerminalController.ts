import { Interface } from 'node:readline/promises';

import {
  addPokemon,
  lerEquipe,
  removPokemon,
} from '../services/addRemovPokemon';
import { buscarPokemonAPI } from '../services/PokeApiService';
import { menuView, adicionarOuRemoverPokemon } from '../view/viewers';

export async function terminalController(interfaceConsole: Interface) {
  let runningTerminal = true;

  while (runningTerminal) {
    menuView();
    const opcao: string = await interfaceConsole.question('(1, 2, 3): ');

    switch (opcao) {
      case '1':
        // buscar
        {
          let runningCases = true;

          const pokemon: string | number = await interfaceConsole.question(
            '\nDigite o Nome/Id do Pokemon que deseja buscar: ',
          );
          const busca = await buscarPokemonAPI(pokemon);
          if (busca) {
            while (runningCases) {
              adicionarOuRemoverPokemon();
              let escolha = await interfaceConsole.question('(1, 2, 3): ');

              if (escolha !== '1' && escolha !== '2' && escolha !== '3') {
                console.log('Opção inexistente!!');
                escolha = await interfaceConsole.question('(1, 2, 3): ');
              }

              if (escolha === '1') {
                // add
                await addPokemon(busca.name);
                runningCases = false;
              }

              if (escolha === '2') {
                // remover
                await removPokemon(busca.name);
                runningCases = false;
              }

              if (escolha === '3') {
                runningCases = false;
              }
            }
          }
        }
        break;

      case '2':
        {
          const equipe = await lerEquipe();
          console.log(equipe);
        }
        break;

      case '3':
        // sair
        runningTerminal = false;
        break;
    }
  }
}
