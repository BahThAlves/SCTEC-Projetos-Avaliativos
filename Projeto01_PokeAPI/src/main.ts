import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'process';

import { terminalController } from './controllers/TerminalController';

async function main() {
  const interfaceConsole = createInterface(stdin, stdout);
  await terminalController(interfaceConsole);

  interfaceConsole.close();
}
void main();
