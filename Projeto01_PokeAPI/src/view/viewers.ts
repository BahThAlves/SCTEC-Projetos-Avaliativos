export function menuView(): void {
  console.log(
    `
  ================================
      POKEDEX TYPESCRIPT LITE
  ================================
  1 - Buscar Pokémon
  2 - Listar Catálogo
  3 - Sair
  ================================
  `,
  );
}

export function adicionarOuRemoverPokemon(pokemonResponse: string): void {
  console.log(
    `
  ================================
      POKEDEX TYPESCRIPT LITE
  ================================
      Pokemon "${pokemonResponse}" encontrado!!

  1 - Adicionar
  2 - Remover
  3 - Sair
  ================================
  `,
  );
}
