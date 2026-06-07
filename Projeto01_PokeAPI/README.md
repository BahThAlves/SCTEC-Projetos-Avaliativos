# Pokédex TypeScript Lite

## Sobre o projeto

O **Pokédex TypeScript Lite** é uma aplicação back-end desenvolvida em Node.js com TypeScript, executada pelo terminal, que permite consultar dados de Pokémon na PokeAPI e gerenciar uma equipe local salva em arquivo JSON.

## Objetivo

Praticar os conceitos fundamentais do Módulo 01:

- Node.js e JavaScript no back-end
- TypeScript com tipagem forte
- Interfaces, classes e modificadores de acesso
- Funções assíncronas com async/await
- Consumo de API externa com fetch
- Manipulação de arquivos com fs/promises
- Tratamento de erros com try/catch
- Métodos de array
- GitHub e GitFlow
- Kanban

## Tecnologias utilizadas

- Node.js
- TypeScript 6
- TSX
- PokeAPI (https://pokeapi.co)
- ESLint + Prettier
- Git / GitHub

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

- Node.js (v18 ou superior)
- npm
- Git

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/BahThAlves/SCTEC-Projetos-Avaliativos.git
```

Acesse a pasta do projeto:

```bash
cd SCTEC-Projetos-Avaliativos/Projeto01_PokeAPI
```

Instale as dependências:

```bash
npm install
```

## Como executar

Execute o projeto em modo de desenvolvimento:

```bash
npm run start
```

## Estrutura do projeto

```
Projeto01_PokeAPI/
│
├── src/
│   ├── main.ts                         # Ponto de entrada da aplicação
│   │
│   ├── controllers/
│   │   └── TerminalController.ts       # Gerencia o menu interativo e entradas do terminal
│   │
│   ├── services/
│   │   ├── PokeApiService.ts           # Integração com a PokeAPI via fetch
│   │   └── addRemovPokemon.ts          # Lógica de leitura, adição, remoção e listagem
│   │
│   ├── models/
│   │   └── responsePokemon.ts          # Classes PokemonResponse, PokemonType e PokemonStats
│   │
│   ├── validators/
│   │   ├── pokemonValidator.ts         # Valida e mapeia resposta da PokeAPI
│   │   ├── equipeValidator.ts          # Valida dados lidos do pc_box.json
│   │   └── baseValidator.ts            # Validações genéricas reutilizáveis
│   │
│   └── view/
│       └── viewers.ts                  # Funções de exibição do menu no terminal
│
├── pc_box.json                         # Banco de dados local (equipe salva em JSON)
├── tsconfig.json
├── package.json
└── README.md
```

## Funcionalidades

- Buscar Pokémon por nome ou ID na PokeAPI
- Tratar erro quando o Pokémon não existe
- Mapear resposta da API para objeto simplificado
- Adicionar Pokémon à equipe local (salvo em `pc_box.json`)
- Impedir Pokémon duplicado pelo ID
- Listar equipe com ID, nome, tipos, HP, ATK e DEF
- Remover Pokémon da equipe pelo nome
- Menu interativo no terminal

## Exemplos de execução

### Busca válida

Entrada:
```
Digite o Nome/Id do Pokemon que deseja buscar: pikachu
```

Saída:
```
Capturando...
Capturado :D
```

### Busca inválida

Entrada:
```
Digite o Nome/Id do Pokemon que deseja buscar: pokemon-inexistente
```

Saída:
```
Error: Erro de busca... :<
```

### Listagem da equipe

Saída:
```
Sua equipe:
#25 - pikachu | Tipos: electric    |    HP: 35 | ATK: 55 | DEF: 40
#4 - charmander | Tipos: fire    |    HP: 39 | ATK: 52 | DEF: 43
```

### Tentativa de adicionar Pokémon duplicado

Saída:
```
Error: O Pokemon "pikachu" já está na sua equipe
```

### Remoção de Pokémon

Entrada:
```
Digite o Nome/Id do Pokemon que deseja buscar: pikachu
(escolha remover)
```

Saída:
```
Soltando pokemon...
Pokemon removido da sua equipe :<
```

### Equipe vazia

Saída:
```
Você não tem pokemons na sua equipe!
```

## Conceitos aplicados

### TypeScript
Todos os arquivos são `.ts` com `strict: true` no `tsconfig.json`. Parâmetros, retornos e variáveis possuem tipagem explícita.

### Classes e modificadores de acesso
`PokemonResponse` utiliza atributos `private` com getters públicos (`id`, `name`, `types`, `stats`). `PokemonStats` e `PokemonType` são classes com atributos `public`.

### Interfaces e validação
Validators tipados (`pokemonValidator`, `equipeValidator`) mapeiam dados externos e do arquivo local para instâncias das classes do modelo, garantindo consistência dos dados.

### Fetch e async/await
`buscarPokemonAPI` consome a PokeAPI de forma assíncrona usando `fetch` nativo do Node.js, com `async/await` e tratamento via `try/catch`.

### Tratamento de erros
Pokémon inexistente lança erro tratado no `try/catch`, exibindo mensagem amigável sem quebrar a aplicação.

### Métodos de array utilizados
- `map` — transforma os tipos da API e os tipos da equipe para exibição
- `findIndex` — localiza o Pokémon pelo nome para remoção
- `splice` — remove o Pokémon do array
- Iteração com `for...of` — percorre a equipe para listagem e verificação de duplicatas

## Organização do Kanban

Link do Kanban: https://trello.com/b/XvUCWDSO/kanbanprojetopokeapi

## Branches utilizadas

- `main` — versão estável e final do projeto
- `develop` — branch de integração das features
- `feat/pokedex` — desenvolvimento das funcionalidades principais
