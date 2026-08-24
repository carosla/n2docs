# N2Docs — Documentação Técnica

> Documentação completa do projeto N2Docs: estrutura, componentes, fluxo de dados e guias de manutenção.

---

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Estrutura de pastas](#2-estrutura-de-pastas)
3. [Roteamento — App.tsx](#3-roteamento--apptsx)
4. [Componentes](#4-componentes)
   - [Header](#41-header)
   - [Sidebar](#42-sidebar)
   - [ManualCard](#43-manualcard)
   - [ManualDetail](#44-manualdetail)
5. [Página principal — Manuals.tsx](#5-página-principal--manualstsx)
   - [Estado (useState)](#51-estado-usestate)
   - [Dados dos manuais](#52-dados-dos-manuais)
   - [Filtragem dinâmica](#53-filtragem-dinâmica)
   - [Fluxo de navegação](#54-fluxo-de-navegação)
6. [Camada de dados — src/data/manuals](#6-camada-de-dados--srcdatamanuals)
   - [types.ts](#61-typests)
   - [Arquivos de passos](#62-arquivos-de-passos)
   - [index.ts](#63-indexts)
7. [Como as peças se conectam](#7-como-as-peças-se-conectam)
8. [Guias práticos](#8-guias-práticos)
   - [Adicionar passos a um manual existente](#81-adicionar-passos-a-um-manual-existente)
   - [Criar um manual novo](#82-criar-um-manual-novo)
   - [Criar uma categoria nova](#83-criar-uma-categoria-nova)
   - [Criar um módulo de relatório novo](#84-criar-um-módulo-de-relatório-novo)
   - [Adicionar ou trocar a cor de uma categoria](#85-adicionar-ou-trocar-a-cor-de-uma-categoria)
9. [Convenções e regras importantes](#9-convenções-e-regras-importantes)
10. [Decisões de arquitetura](#10-decisões-de-arquitetura)

---

## 1. Visão geral

O **N2Docs** é uma SPA (Single Page Application) feita em **React + TypeScript + Vite** que serve como portal de manuais do sistema ERP N2.

O usuário navega pela sidebar (categorias e relatórios), vê cards de manuais disponíveis e, ao clicar em um card, visualiza o passo a passo detalhado daquele manual — tudo sem recarregar a página.

**Tecnologias usadas:**

| Tecnologia | Função |
|---|---|
| React 18 | Interface e gerenciamento de estado |
| TypeScript | Tipagem estática |
| Vite | Bundler e servidor de desenvolvimento |
| React Router v6 | Roteamento entre páginas |
| CSS Modules | Estilos com escopo por componente |
| lucide-react | Ícones |

---

## 2. Estrutura de pastas

```
src/
├── App.tsx                          # Roteamento principal
├── main.tsx                         # Ponto de entrada do React
├── index.css                        # Reset / estilos globais
│
├── pages/
│   ├── Home/
│   │   ├── Home.tsx                 # Página inicial (/)
│   │   └── Home.module.css
│   └── Manuals/
│       ├── Manuals.tsx              # Página de manuais (/manuais) ← principal
│       └── Manuals.module.css
│
├── components/
│   ├── Header/
│   │   ├── Header.tsx               # Barra de navegação superior
│   │   └── Header.module.css
│   ├── Sidebar/
│   │   ├── Sidebar.tsx              # Menu lateral de categorias
│   │   └── Sidebar.module.css
│   ├── ManualCard/
│   │   ├── ManualCard.tsx           # Card clicável de manual
│   │   └── ManualCard.module.css
│   └── ManualDetail/
│       ├── ManualDetail.tsx         # Tela de passo a passo
│       └── ManualDetail.module.css
│
└── data/
    └── manuals/
        ├── types.ts                 # Tipos TypeScript compartilhados
        ├── index.ts                 # Une todos os passos em allSteps
        ├── cadastros.ts             # Passos dos manuais de Cadastros
        ├── financeiro.ts            # Passos dos manuais de Financeiro
        ├── estoque.ts               # Passos dos manuais de Estoque
        ├── comprasVendas.ts         # Passos de Compras e Vendas
        └── relatorios.ts            # Passos dos Relatórios
```

---

## 3. Roteamento — App.tsx

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home }    from './pages/Home/Home';
import { Manuals } from './pages/Manuals/Manuals';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/manuais" element={<Manuals />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Rotas existentes:**

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `<Home />` | Página inicial |
| `/manuais` | `<Manuals />` | Portal de manuais |

Para criar novas páginas, adicione um `<Route>` aqui e crie a pasta correspondente em `src/pages/`.

---

## 4. Componentes

### 4.1 Header

**Arquivo:** `src/components/Header/Header.tsx`

Barra superior fixa com logo e links de navegação. Não recebe props — é completamente estático.

```tsx
export function Header() {
  // Renderiza: ícone azul | N2docs | links: Docs / Time / Atualizações
}
```

**CSS relevante (`Header.module.css`):**

| Classe | O que faz |
|---|---|
| `.header` | Flex row, altura 64px, fundo `#f4f4f4`, borda inferior |
| `.menuIcon` | Quadrado azul `#2563eb` com ícone branco de menu |
| `.logo` | Texto "N2" preto + "docs" azul |
| `.nav` | Links horizontais com gap de 36px |

**Responsividade:** abaixo de 768px, `.nav` é ocultado (`display: none`).

---

### 4.2 Sidebar

**Arquivo:** `src/components/Sidebar/Sidebar.tsx`

Menu lateral com duas seções: **Categorias** e **Relatórios**. É um componente **controlado** — não gerencia qual item está selecionado por conta própria; recebe o estado do pai (`Manuals.tsx`) via props e avisa o pai quando o usuário clica.

#### Props

```ts
type SidebarProps = {
  selectedCategory: string;     // categoria atualmente ativa
  selectedSub: string | null;   // subcategoria de Cadastros ativa (ou null)
  onSelectCategory: (cat: string) => void;  // chamado ao clicar em categoria
  onSelectSub: (sub: string) => void;       // chamado ao clicar em subcategoria
};
```

#### Estado interno

```ts
const [cadastrosOpen, setCadastrosOpen] = useState(false);
// Controla se o submenu de Cadastros está expandido ou recolhido.
```

#### Listas estáticas

```ts
// Categorias da seção "CATEGORIAS"
const categories = ['Todos os manuais', 'Cadastros', 'Estoque', 'Compras', ...];

// Subcategorias visíveis quando Cadastros está aberto
const cadastros = ['Básicos', 'Auxiliares', 'Fiscais', 'Financeiros', 'Comerciais', 'Estoque', 'EPI'];

// Itens da seção "RELATÓRIOS"
// Ao clicar, envia 'Rel-Dashboard', 'Rel-Vendas', etc.
const reports = ['Dashboard', 'Controladoria', 'Vendas', 'Estoque', 'Compras', 'Faturamento', 'Financeiro'];
```

> **Atenção:** os itens de relatório são enviados com o prefixo `Rel-` para que o `Manuals.tsx`
> consiga distinguir `'Vendas'` (categoria) de `'Rel-Vendas'` (relatório de vendas).

#### Handlers

```ts
// Clique em qualquer categoria (exceto Cadastros)
handleCategoryClick(category) → fecha submenu + chama onSelectCategory(category)

// Clique em "Cadastros"
handleCadastrosClick() → alterna cadastrosOpen + chama onSelectCategory('Cadastros')

// Clique em subcategoria de Cadastros
handleSubClick(sub) → chama onSelectSub(sub)  [só funciona se selectedCategory === 'Cadastros']
```

#### Classe ativa

- Item de categoria fica com `.active` quando `selectedCategory === category && !selectedSub`
- Item de subcategoria fica com `.activeSub` quando `selectedSub === sub`
- Item de relatório fica com `.active` quando `selectedCategory === 'Rel-Dashboard'`, etc.

---

### 4.3 ManualCard

**Arquivo:** `src/components/ManualCard/ManualCard.tsx`

Card clicável que representa um manual na grade. Exibe um **quadradinho colorido** no canto inferior direito indicando a categoria ou relatório ao qual o manual pertence.

#### Props

```ts
type ManualCardProps = {
  title?:       string;    // título do manual
  description?: string;    // descrição curta
  active?:      boolean;   // aplica estilo diferenciado (borda/fundo azul claro)
  category?:    string;    // categoria do manual — define a cor do dot (ex: 'Financeiro', 'Rel-Vendas')
  onClick?:     () => void; // chamado quando o usuário clica no card
};
```

#### Mapa de cores — `CATEGORY_COLORS`

Objeto estático no topo do arquivo que associa cada categoria a uma cor. É a **única** parte do código que precisa ser editada para trocar ou adicionar cores.

```ts
const CATEGORY_COLORS: Record<string, string> = {
  // Categorias operacionais
  Cadastros:      '#2563eb', // azul
  Estoque:        '#16a34a', // verde
  Compras:        '#d97706', // âmbar
  Vendas:         '#9333ea', // roxo
  Faturamento:    '#0891b2', // ciano
  Financeiro:     '#dc2626', // vermelho
  'Bancos/Cofre': '#0f766e', // verde-azulado
  Gráfica:        '#db2777', // rosa
  Química:        '#7c3aed', // violeta
  Produção:       '#ea580c', // laranja
  CRM:            '#0284c7', // azul-céu

  // Relatórios (prefixo Rel-)
  'Rel-Dashboard':     '#6366f1', // índigo
  'Rel-Controladoria': '#0f766e', // verde-azulado
  'Rel-Vendas':        '#9333ea', // roxo
  'Rel-Estoque':       '#16a34a', // verde
  'Rel-Compras':       '#d97706', // âmbar
  'Rel-Faturamento':   '#0891b2', // ciano
  'Rel-Financeiro':    '#dc2626', // vermelho
};

const DEFAULT_COLOR = '#94a3b8'; // cinza-azulado para categorias não mapeadas
```

#### Comportamento

```tsx
const dotColor = category
  ? (CATEGORY_COLORS[category] ?? DEFAULT_COLOR)
  : DEFAULT_COLOR;

<article
  className={`${styles.card} ${active ? styles.active : ''}`}
  onClick={onClick}
>
  {title && <h3>{title}</h3>}
  {description && <p>{description}</p>}

  {/* Quadradinho colorido no canto inferior direito */}
  <span
    className={styles.categoryDot}
    style={{ backgroundColor: dotColor }}
    title={category ?? ''}   // tooltip com o nome da categoria
  />
</article>
```

**CSS relevante:**

| Classe | O que faz |
|---|---|
| `.card` | Borda cinza, altura 160px, `position: relative` (ancora o dot), cursor pointer |
| `.card:hover` | Borda azul `#2563eb`, fundo branco |
| `.active` | Borda `#9bbcff`, fundo `#f8fbff` (azul bem claro) |
| `.categoryDot` | `position: absolute`, canto `bottom: 12px / right: 12px`, quadrado 10×10px com `border-radius: 3px`, opacidade 0.75 |
| `.card:hover .categoryDot` | Opacidade sobe para 1 (fica mais vivo no hover) |

> **Como a cor chega ao elemento:** a classe `.categoryDot` não define `background-color` no CSS — ela apenas posiciona e dimensiona o elemento. A cor é injetada via `style={{ backgroundColor: dotColor }}` no TSX, pois é dinâmica (varia por card).

---

### 4.4 ManualDetail

**Arquivo:** `src/components/ManualDetail/ManualDetail.tsx`

Tela de detalhe exibida quando o usuário clica em um card. Mostra breadcrumb, cabeçalho com ícone, área de preview e lista numerada de passos.

#### Tipos exportados

```ts
// Um passo individual do manual
export type Step = {
  description: string;  // texto principal do passo
  detail?: string;      // texto do link "mostre detalhes" (opcional)
};

// Dados necessários para renderizar um manual completo
export type ManualData = {
  title:       string;
  description: string;
  category:    string;
  sub?:        string | null;
  steps?:      Step[];
};
```

#### Props

```ts
type ManualDetailProps = {
  manual: ManualData;   // dados do manual a exibir
  onBack: () => void;   // chamado ao clicar no breadcrumb "voltar"
};
```

#### Estrutura visual

```
[ ← Todos os cadastros ]          ← botão breadcrumb (chama onBack)

[ ícone ] Cadastro de {title}  [ badge ]
           {description}

[ caixa cinza de preview ]         ← placeholder para imagem/gif

1  {step.description}
   mostre detalhes                 ← link opcional por passo

2  {step.description}
   ...
```

**Animação de entrada:**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 5. Página principal — Manuals.tsx

**Arquivo:** `src/pages/Manuals/Manuals.tsx`

É o componente raiz da funcionalidade de manuais. Ele:
- Guarda todo o estado de navegação
- Mantém a lista completa de manuais
- Filtra os manuais conforme a seleção do usuário
- Decide o que renderizar: lista de cards ou detalhe de um manual

### 5.1 Estado (useState)

```ts
// Categoria selecionada na sidebar. Valor inicial: 'Todos os manuais'
const [selectedCategory, setSelectedCategory] = useState('Todos os manuais');

// Subcategoria de Cadastros selecionada. null = nenhuma
const [selectedSub, setSelectedSub] = useState<string | null>(null);

// Texto da busca
const [search, setSearch] = useState('');

// Manual aberto no detalhe. null = mostra a lista de cards
const [openManual, setOpenManual] = useState<Manual | null>(null);
```

### 5.2 Dados dos manuais

Os manuais são definidos em **objetos estáticos** no topo do arquivo e convertidos para o array `allManuals` na inicialização do módulo (fora do componente, então só rodam uma vez).

#### Tipo Manual

```ts
type Manual = {
  title:       string;       // deve ser idêntico à chave em allSteps
  description: string;       // texto do card
  category:    string;       // ex: 'Cadastros', 'Financeiro', 'Rel-Dashboard'
  sub:         string | null; // subcategoria de Cadastros ou null
  active:      boolean;       // estilo do card
  steps?:      Step[];        // passos vindos de allSteps
};
```

#### cadastrosManuais

```ts
const cadastrosManuais = {
  Básicos:     ['Funcionario', 'Usuario', 'Clientes', ...],
  Auxiliares:  ['Cadastro de Grupos', ...],
  Fiscais:     ['Cadastro Operação Fiscal', ...],
  Financeiros: ['Cadastro Prazo Pagamento', ...],
  Comerciais:  ['Grupo de Clientes', ...],
  Estoque:     ['Cadastro Unidades Comerciais', ...],
  EPI:         ['Certificado de Aprovação EPI', ...],
};
```

A chave de cada objeto é a subcategoria (`sub`). Os títulos dentro de cada array viram manuais com `category: 'Cadastros'`.

#### outrosManuais

```ts
const outrosManuais: Record<string, string[]> = {
  Estoque:      ['Entrada de Produto', ...],
  Compras:      ['Ordem de Compra', ...],
  Vendas:       ['Pedidos', ...],
  Faturamento:  ['Nota Fiscal Eletronica', ...],
  Financeiro:   ['Titulos a Receber', ...],
  'Bancos/Cofre': ['Lançamentos Bancários', ...],
  Gráfica:      ['Cadastro Folhas', ...],
  Química:      ['Classificação Onu', ...],
  Produção:     ['Plano Produção', ...],
  CRM:          ['Cadastro Campanhas', ...],
};
```

A chave vira `category` diretamente. `sub` é sempre `null`.

#### relatoriosManuais

```ts
const relatoriosManuais: Record<string, string[]> = {
  'Rel-Dashboard':     ['Painel Gerencial', 'Metas vs Realizado'],
  'Rel-Controladoria': ['DRE Gerencial', 'Balanço Patrimonial'],
  'Rel-Vendas':        ['Ranking de Vendedores', ...],
  'Rel-Estoque':       ['Posição de Estoque', ...],
  'Rel-Compras':       ['Histórico de Compras', ...],
  'Rel-Faturamento':   ['NF-e Emitidas', ...],
  'Rel-Financeiro':    ['Fluxo de Caixa Projetado', ...],
};
```

A chave `'Rel-X'` coincide exatamente com o que `Sidebar.tsx` envia ao chamar `onSelectCategory('Rel-Dashboard')`.

#### Geração do array final

```ts
// Achata cadastrosManuais em array de Manual
const manuaisCadastros = Object.entries(cadastrosManuais).flatMap(
  ([sub, titles]) => titles.map(title => ({
    title,
    description: `Manual de ${title.toLowerCase()} no sistema.`,
    category: 'Cadastros',
    sub,
    active: true,
    steps: allSteps[title] ?? [], // busca os passos pelo título
  }))
);

// Mesmo processo para outrosManuais e relatoriosManuais
const allManuals = [...manuaisCadastros, ...manuaisOutros, ...manuaisRelatorios];
```

> `allSteps[title] ?? []` — se não existir passos cadastrados para aquele título,
> o manual é criado com `steps: []` e o detalhe abre sem listar nenhum passo.

### 5.3 Filtragem dinâmica

```ts
const filtered = allManuals.filter((manual) => {
  // 1. Categoria bate com a selecionada (ou "Todos os manuais")
  const matchCategory =
    selectedCategory === 'Todos os manuais' ||
    manual.category === selectedCategory;

  // 2. Subcategoria (só se aplica quando Cadastros está selecionado)
  const matchSub =
    selectedCategory !== 'Cadastros' ||
    !selectedSub ||
    manual.sub === selectedSub;

  // 3. Busca de texto no título e na descrição
  const matchSearch =
    !search ||
    manual.title.toLowerCase().includes(search.toLowerCase()) ||
    manual.description.toLowerCase().includes(search.toLowerCase());

  return matchCategory && matchSub && matchSearch;
});
```

Os três filtros são aplicados em conjunto. O array `filtered` é recalculado automaticamente pelo React toda vez que `selectedCategory`, `selectedSub` ou `search` mudam.

### 5.4 Fluxo de navegação

```
Estado inicial
  selectedCategory = 'Todos os manuais'
  selectedSub      = null
  openManual       = null
       │
       ▼
  [Lista de cards] — todos os manuais
       │
       ├── Usuário clica na Sidebar
       │     → handleSelectCategory(cat) ou handleSelectSub(sub)
       │     → atualiza selectedCategory / selectedSub
       │     → openManual = null (fecha qualquer detalhe aberto)
       │     → filtered é recalculado → cards atualizam
       │
       ├── Usuário digita na busca
       │     → search atualiza
       │     → filtered é recalculado
       │
       └── Usuário clica em um card
             → openManual = manual (objeto com title, category, steps, etc.)
             → renderiza <ManualDetail> no lugar da lista
             → o dot colorido do card usa manual.category para determinar sua cor
             │
             └── Usuário clica em "← Todos os cadastros"
                   → openManual = null
                   → volta para a lista de cards
```

---

## 6. Camada de dados — src/data/manuals

### 6.1 types.ts

Define os tipos TypeScript usados em todos os arquivos de dados.

```ts
// Um passo individual
export type Step = {
  description: string;  // texto obrigatório do passo
  detail?: string;      // texto do link "mostre detalhes" (opcional)
};

// Dicionário de passos indexado pelo título do manual
export type ManualSteps = {
  [title: string]: Step[];
};
```

### 6.2 Arquivos de passos

Cada arquivo cobre um módulo do sistema e exporta um objeto do tipo `ManualSteps`.

| Arquivo | Exportação | Cobre |
|---|---|---|
| `cadastros.ts` | `cadastrosSteps` | Todos os Cadastros |
| `financeiro.ts` | `financeiroSteps` | Módulo Financeiro |
| `estoque.ts` | `estoqueSteps` | Módulo Estoque |
| `comprasVendas.ts` | `comprasSteps`, `vendasSteps` | Compras e Vendas |
| `relatorios.ts` | `relatoriosSteps` | Todos os Relatórios |

**Estrutura padrão de cada arquivo:**

```ts
import type { ManualSteps } from './types';

export const xyzSteps: ManualSteps = {
  // A chave DEVE ser idêntica ao título em Manuals.tsx
  'Título do Manual': [
    {
      description: 'Descrição do passo 1',
      detail: 'mostre detalhes',       // opcional
    },
    {
      description: 'Descrição do passo 2',
      detail: 'mostre detalhes',
    },
  ],
};
```

> **Regra crítica:** a chave do objeto (ex: `'Funcionario'`) deve ser
> **exatamente igual** ao título usado em `Manuals.tsx` (ex: `'Funcionario'`
> no array `Básicos` de `cadastrosManuais`). Qualquer diferença (acento,
> espaço, maiúscula) faz com que `allSteps[title]` retorne `undefined`
> e o manual fique sem passos.

### 6.3 index.ts

Ponto único de saída dos dados. Importa todos os arquivos de passos e os une em um único objeto `allSteps`.

```ts
export type { Step, ManualSteps } from './types';  // re-exporta tipos

import { cadastrosSteps }            from './cadastros';
import { financeiroSteps }           from './financeiro';
import { estoqueSteps }              from './estoque';
import { comprasSteps, vendasSteps } from './comprasVendas';
import { relatoriosSteps }           from './relatorios';

export const allSteps = {
  ...cadastrosSteps,
  ...financeiroSteps,
  ...estoqueSteps,
  ...comprasSteps,
  ...vendasSteps,
  ...relatoriosSteps,
};
```

`Manuals.tsx` importa **apenas** daqui:

```ts
import { allSteps } from '../../data/manuals';
```

Se duas chaves tiverem o mesmo nome em arquivos diferentes, a última no spread vence. Evite títulos duplicados entre módulos.

---

## 7. Como as peças se conectam

```
main.tsx
  └── <App />
        └── <BrowserRouter>
              └── /manuais → <Manuals />
                    │
                    ├── <Header />                    (sem props)
                    │
                    ├── <Sidebar                      (componente controlado)
                    │     selectedCategory={...}
                    │     selectedSub={...}
                    │     onSelectCategory={fn}
                    │     onSelectSub={fn}
                    │   />
                    │
                    └── <main>
                          │
                          ├── [openManual === null]
                          │     ├── campo de busca
                          │     └── {filtered.map(m =>
                          │             <ManualCard onClick={() => setOpenManual(m)} />
                          │           )}
                          │
                          └── [openManual !== null]
                                └── <ManualDetail
                                      manual={openManual}
                                      onBack={() => setOpenManual(null)}
                                    />
```

**Fluxo de dados:**

```
src/data/manuals/
  cadastros.ts  ──┐
  financeiro.ts ──┤
  estoque.ts    ──┼──► index.ts (allSteps) ──► Manuals.tsx
  comprasVendas ──┤                              │
  relatorios.ts ──┘                              │
                                                 ▼
                                          allManuals[]
                                          (array de Manual)
                                                 │
                                         .filter(filtered)
                                                 │
                                    ┌────────────┴────────────┐
                                    │                         │
                               <ManualCard />         <ManualDetail />
                               (lista de cards)       (passo a passo)
```

---

## 8. Guias práticos

### 8.1 Adicionar passos a um manual existente

Abra o arquivo de dados da categoria correspondente e adicione ou edite a entrada:

**Exemplo:** adicionar passos ao manual "Produto Pizzaria" (Cadastros → Básicos)

```ts
// src/data/manuals/cadastros.ts

export const cadastrosSteps: ManualSteps = {
  // ... entradas existentes ...

  'Produto Pizzaria': [          // ← chave igual ao título em Manuals.tsx
    {
      description: 'Acesse "Cadastros → Produtos"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "+" e selecione o tipo "Pizzaria"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Informe os sabores, tamanhos e valores',
      detail: 'mostre detalhes',
    },
  ],
};
```

Pronto. Nenhum outro arquivo precisa ser alterado.

---

### 8.2 Criar um manual novo

**Passo 1 — Adicione o título em Manuals.tsx** na categoria correta:

```ts
// src/pages/Manuals/Manuals.tsx

// Se for Cadastros, adicione na subcategoria certa:
const cadastrosManuais = {
  Básicos: [
    'Funcionario',
    'Usuario',
    'Meu Novo Manual',  // ← adicione aqui
  ],
  // ...
};

// Se for outra categoria:
const outrosManuais = {
  Financeiro: [
    'Titulos a Receber',
    'Meu Novo Manual Financeiro',  // ← adicione aqui
  ],
  // ...
};
```

**Passo 2 — Adicione os passos no arquivo de dados:**

```ts
// src/data/manuals/cadastros.ts  (ou financeiro.ts, etc.)

export const cadastrosSteps: ManualSteps = {
  'Meu Novo Manual': [
    { description: 'Passo 1...', detail: 'mostre detalhes' },
    { description: 'Passo 2...', detail: 'mostre detalhes' },
  ],
};
```

> Se você não adicionar passos, o manual aparece como card normalmente,
> mas ao abrir o detalhe não lista nenhum passo. Não gera erro.

---

### 8.3 Criar uma categoria nova

**Exemplo:** criar a categoria "Agro"

**Passo 1 — Adicione em `Manuals.tsx`:**

```ts
const outrosManuais: Record<string, string[]> = {
  // ... categorias existentes ...
  Agro: [                         // ← nova categoria
    'Cadastro de Talhões',
    'Ordem de Plantio',
    'Colheita',
  ],
};
```

**Passo 2 — Adicione na Sidebar:**

```ts
// src/components/Sidebar/Sidebar.tsx

const categories = [
  'Todos os manuais',
  'Cadastros',
  'Estoque',
  // ... existentes ...
  'Agro',  // ← adicione aqui
];
```

**Passo 3 — Crie o arquivo de passos:**

```ts
// src/data/manuals/agro.ts
import type { ManualSteps } from './types';

export const agroSteps: ManualSteps = {
  'Cadastro de Talhões': [
    { description: 'Acesse "Agro → Talhões"', detail: 'mostre detalhes' },
    { description: 'Clique em "+" para novo talhão', detail: 'mostre detalhes' },
  ],
  // ...
};
```

**Passo 4 — Registre no index:**

```ts
// src/data/manuals/index.ts
import { agroSteps } from './agro';  // ← adicione

export const allSteps = {
  // ... existentes ...
  ...agroSteps,  // ← adicione
};
```

---

### 8.4 Criar um módulo de relatório novo

**Exemplo:** criar "Rel-Agro" para relatórios agrícolas

**Passo 1 — Adicione em `Manuals.tsx`:**

```ts
const relatoriosManuais: Record<string, string[]> = {
  // ... existentes ...
  'Rel-Agro': [          // ← prefixo 'Rel-' obrigatório
    'Produtividade por Talhão',
    'Relatório de Insumos',
  ],
};
```

**Passo 2 — Adicione na Sidebar:**

```ts
// src/components/Sidebar/Sidebar.tsx

const reports = [
  'Dashboard',
  // ... existentes ...
  'Agro',   // ← o prefixo 'Rel-' é adicionado automaticamente ao clicar
];
```

**Passo 3 — Adicione os passos em `relatorios.ts`:**

```ts
// src/data/manuals/relatorios.ts

export const relatoriosSteps: ManualSteps = {
  // ... existentes ...
  'Produtividade por Talhão': [
    { description: 'Acesse "Relatórios → Agro → Produtividade"', detail: 'mostre detalhes' },
    { description: 'Selecione o período de safra', detail: 'mostre detalhes' },
  ],
};
```

O `index.ts` já importa `relatoriosSteps`, então não precisa de alteração.

---

### 8.5 Adicionar ou trocar a cor de uma categoria

Todas as cores dos dots ficam centralizadas no objeto `CATEGORY_COLORS`, no topo de `ManualCard.tsx`. É o **único arquivo** que precisa ser editado.

**Trocar a cor de uma categoria existente:**

```ts
// src/components/ManualCard/ManualCard.tsx

const CATEGORY_COLORS: Record<string, string> = {
  Financeiro: '#dc2626', // era vermelho — troque para o valor desejado
  // ...
};
```

**Adicionar cor para uma categoria nova** (ex: "Agro" criada no guia 8.3):

```ts
const CATEGORY_COLORS: Record<string, string> = {
  // ... cores existentes ...
  Agro: '#65a30d', // verde-limão
};
```

**Adicionar cor para um relatório novo** (ex: "Rel-Agro" criado no guia 8.4):

```ts
const CATEGORY_COLORS: Record<string, string> = {
  // ... cores existentes ...
  'Rel-Agro': '#84cc16', // verde-limão mais claro
};
```

> Se uma categoria não tiver entrada em `CATEGORY_COLORS`, o dot aparece na cor padrão `#94a3b8` (cinza-azulado), definida pela constante `DEFAULT_COLOR`. Isso nunca gera erro — serve como fallback visual.

---

## 9. Convenções e regras importantes

### Prefixo `Rel-`

Relatórios usam o prefixo `Rel-` na `category` para diferenciar de módulos operacionais com o mesmo nome (ex: `'Vendas'` vs `'Rel-Vendas'`).

- A `Sidebar` envia: `onSelectCategory('Rel-Dashboard')`
- O `Manuals.tsx` filtra: `manual.category === 'Rel-Dashboard'`
- O `relatoriosManuais` usa: `{ 'Rel-Dashboard': [...] }`

Os três devem usar a mesma string.

### Títulos são chaves

O `title` de um manual em `Manuals.tsx` é usado como chave para buscar os passos:

```ts
steps: allSteps[title] ?? []
```

Portanto **título em `Manuals.tsx`** e **chave em `xyzSteps`** devem ser idênticos — incluindo maiúsculas, acentos e espaços.

### CSS Modules

Cada componente tem seu próprio arquivo `.module.css`. Classes são importadas como objeto:

```ts
import styles from './Meu.module.css';
// uso:
<div className={styles.minhaClasse} />
// classes combinadas:
<div className={`${styles.card} ${active ? styles.active : ''}`} />
```

Isso garante que `.card` em `ManualCard.module.css` nunca conflite com `.card` em outro componente.

### Dot colorido de categoria

O quadradinho no canto inferior direito do card é controlado por três partes:

| Parte | Responsabilidade |
|---|---|
| `CATEGORY_COLORS` em `ManualCard.tsx` | Define qual cor corresponde a qual categoria |
| Prop `category` do `<ManualCard>` | Transporta o valor de `manual.category` até o componente |
| `style={{ backgroundColor: dotColor }}` | Aplica a cor dinamicamente via inline style |

A cor **nunca** é definida no CSS — isso seria impossível, pois é dinâmica. O CSS só cuida do posicionamento e tamanho do elemento.

### Componentes controlados vs. autônomos

| Componente | Tipo | Razão |
|---|---|---|
| `Sidebar` | Controlado | Precisa refletir o estado do pai |
| `ManualCard` | Controlado | `onClick` e `category` vêm do pai |
| `ManualDetail` | Controlado | `manual` e `onBack` vêm do pai |
| `Header` | Autônomo | Totalmente estático |

---

## 10. Decisões de arquitetura

### Estado elevado (Lifted State)

Todo o estado de navegação vive em `Manuals.tsx` (o pai), não nos componentes filhos. Isso permite que `Sidebar` e a área de conteúdo se comuniquem sem precisar de Context API ou gerenciador de estado externo (Redux, Zustand, etc.).

### Dados estáticos no módulo (fora do componente)

`cadastrosManuais`, `outrosManuais`, `relatoriosManuais` e `allManuals` são declarados fora da função `Manuals()`. Isso significa que são criados **uma única vez** quando o módulo carrega, não a cada re-render. Como são dados imutáveis, isso é o comportamento correto e mais eficiente.

### Filtragem no cliente

Toda a filtragem (`filtered`) acontece no navegador com `.filter()`. Para a escala atual (centenas de manuais), isso é instantâneo e dispensa uma API de busca. Se o volume crescer muito, seria possível migrar para busca com debounce + API sem mudar a interface dos componentes.

### Separação dados/UI

Os passos dos manuais ficam em `src/data/manuals/` separados dos componentes. Isso permite que pessoas não-técnicas possam eventualmente editar os passos (ou que os dados venham de uma API no futuro) sem tocar na lógica de renderização.
