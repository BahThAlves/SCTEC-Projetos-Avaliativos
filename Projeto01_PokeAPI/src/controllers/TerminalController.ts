import { Interface } from 'node:readline';

import { menuView } from '../view/viewers';

export async function terminalController(interfaceConsole: Interface) {
  menuView();
  const opcaoEscolhida = await interfaceConsole.question('pergunta');

  return opcaoEscolhida;
}
