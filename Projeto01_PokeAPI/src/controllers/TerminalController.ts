import { Interface } from 'node:readline';

import { menuView } from '../view/viewers';

export async function terminalController(interfaceConsole: Interface) {
  menuView();
  const opcao: string = await interfaceConsole.question('(1, 2, 3, 4): ');

  switch (opcao) {
    case '1':
      break;

    case '2':
      break;

    case '3':
      break;

    case '4':
      break;

    default:
      break;
  }
}
