import { useState } from 'react';
import styles from './Manuals.module.css';
import { Search } from 'lucide-react';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ManualCard } from '../../components/ManualCard/ManualCard';

// Manuals.tsx

type Manual = {
  title: string;
  description: string;
  category: string;
  sub: string | null;
  active: boolean;
};

// ======================================================
// MANUAIS DE CADASTROS
// ======================================================

const cadastrosManuais = {
  Básicos: [
    'Funcionario',
    'Usuario',
    'Clientes',
    'Fornecedor',
    'Cadastro de Produto Geral',
    'Produto Pizzaria',
    'Produto de Balança',
    'Produto de Grade',
    'Produto de Desossa',
  ],

  Auxiliares: [
    'Cadastro de Grupos',
    'Cadastro de SubGrupos',
    'Cadastro de Sub-SubGrupos',
    'Cadastro de Cores',
    'Cadastro de Grade',
    'Cadastro Montadores de Veiculos',
    'Cadastro de Veiculos',
    'Classificações de Serviços',
    'Sub Classificação de Serviços',
    'Cadastro Classificação de Frete',
    'Cadastro Grupos Cenarios e B.I',
    'Cadastro Consulta Cenarios e B.I',
    'Cadastro Controle de Ponto',
    'Cadastro de Cargos',
    'Cadastro de Calendarios e Feriados',
    'Configuração Mercado Livre',
    'Cadastro de Equipamentos Grafica',
  ],

  Fiscais: [
    'Cadastro Operação Fiscal',
    'Cadastro Mensagem Fiscal',
    'Cadastro Padrão Tributario',
    'Cadastro CFOP',
    'Cadastro de Países',
    'Cadastro de NCM',
    'Cadastro IBPT',
    'Cadastro CEST',
    'Cadastro Regra Tributaria',
  ],

  Financeiros: [
    'Cadastro Prazo Pagamento',
    'Cadastro Especie Documento',
    'Cadastro Plano Financeiro',
    'Cadastro Centro de Custo',
    'Cadastro Bancos',
    'Cadastro Moedas',
    'Cadastro Operação Bancaria',
    'Cadastro Contas/Cofre',
    'Cadastro Administradora de Cartões',
    'Cadastro Intermediador Comercial',
  ],

  Comerciais: [
    'Grupo de Clientes',
    'Segmento Atuação',
    'Departamento',
    'Rotas',
  ],

  Estoque: [
    'Cadastro Unidades Comerciais',
    'Cadastro Tipo de Lançamento',
    'Cadastro Local de Estoque',
  ],

  EPI: [
    'Certificado de Aprovação EPI',
    'Produto EPI',
    'Tipo Movimento EPI',
    'Funcionario EPI',
    'Entrega EPI',
  ],
};

// ======================================================
// DEMAIS CATEGORIAS
// ======================================================

const outrosManuais: Record<string, string[]> = {
  Agro: [
    'Cultivo',
    'Status de Projetos',
    'Tipo de Projetos',
    'Fazendas',
    'Projetos',
  ],

  Estoque: [
    'Entrada de Produto',
    'Entrada de Produtos por Código de Barras',
    'Saida de Produtos',
    'Inventário de Estoque',
    'Reposição de Estoque',
    'Posição de Estoque',
    'Exportar Produtos de Balança',
    'Gera Etiqueta de Lote de Produto',
    'Transferência Entre Locais de Estoque',
    'Importar Preço de Custo por Excel',
    'Controle de Entrega de EPI',
  ],

  Compras: [
    'Ordem de Compra',
    'Nota de Entrada Manual',
    'Nota de Entrada por XML',
    'Entrada de Documentos',
    'Mapa de Compras',
    'Desossa',
    'Controle de Pesagem',
  ],

  Vendas: [
    'Pedidos',
    'Pedidos Mod. II',
    'Pedidos Mod. III',
    'Pedidos PDV',
    'Consignado',
    'Trocas',
    'Ordem de Carga',
    'Controle de Vasilhames',
    'Contratos',
    'Ordem de Serviço',
    'Controle de Entregas',
    'Previsão de Vendas',
    'Separação de Pedidos',
  ],

  Convênio: [
    'Controle de Fechamento',
    'Fechamento por Competência',
  ],

  Faturamento: [
    'Nota Fiscal Eletronica',
    'Inutilização de NF-e',
    'Manifesto de Despacho',
  ],

  Financeiro: [
    'Titulos a Receber',
    'Baixa de Titulos a Receber',
    'Cobrança Bancaria',
    'Retorno Bancario',
    'Cheque de Terceiros',
    'Baixa de Cheque',
    'Lançamento Cartões',
    'Baixa de Cartões',
    'Borderô de Desconto',

    'Titulos a Pagar',
    'Baixa Titulos a Pagar',
    'Entrada de Titulos',
    'Previsões',
  ],

  'Bancos/Cofre': [
    'Lançamentos Bancários',
    'Transf. Constas Bancarias',
    'Conciliação Bancaria',
  ],

  Gráfica: [
    'Cadastro Folhas',
    'Cadastro de Custos',
    'Parâmetros de Serviço',
  ],

  Química: [
    'Classificação Onu',
    'Grupo de Etapas',
    'Etapa de Produção',
    'Instruções de Trabalho',
    'Estrutura de Produção',
    'Analise Fisica',
    'Classificação de Produto',
    'Instrumentos',
    'Máscaras',
    'Classificação IBAMA',
    'Cadastro GHS',
    'Custo de Industrialização',
    'Cadastro de Lote',
  ],

  Produção: [
    'Plano Produção',
    'Ordem Produção',
    'Apontamento',
  ],

  CRM: [
    'Cadastro Campanhas',
    'Onde Conheceu',
    'Origem do Contato',
    'Regiões',
    'Probabilidade de Fechamento',
    'Status Lead',
  ],

  Treinamento: [
    'Parametrização NFe',
    'Cadastros NFe',
    'NFe por Pedido',
    'NFe Avulsa',
    'Rejeições NFe',
  ],
};

// ======================================================
// GERA OS MANUAIS DE CADASTROS
// ======================================================

const manuaisCadastros: Manual[] = Object.entries(
  cadastrosManuais
).flatMap(([sub, titles]) =>
  titles.map((title) => ({
    title,
    description: `Manual de ${title.toLowerCase()} no sistema.`,
    category: 'Cadastros',
    sub,
    active: true,
  }))
);

// ======================================================
// GERA OS DEMAIS MANUAIS
// ======================================================

const manuaisOutros: Manual[] = Object.entries(
  outrosManuais
).flatMap(([category, titles]) =>
  titles.map((title) => ({
    title,
    description: `Manual de ${title.toLowerCase()} no módulo ${category}.`,
    category,
    sub: null,
    active: true,
  }))
);

// ======================================================
// TODOS OS MANUAIS
// ======================================================

const allManuals: Manual[] = [
  ...manuaisCadastros,
  ...manuaisOutros,
];

export function Manuals() {
  const [selectedCategory, setSelectedCategory] =
    useState('Todos os manuais');

  const [selectedSub, setSelectedSub] =
    useState<string | null>(null);

  const [search, setSearch] = useState('');

  // Filtragem dos manuais
  const filtered = allManuals.filter((manual) => {
    // Verifica a categoria
    const matchCategory =
      selectedCategory === 'Todos os manuais' ||
      manual.category === selectedCategory;

    // A subcategoria só deve ser considerada
    // quando a categoria selecionada for "Cadastros".
    const matchSub =
      selectedCategory !== 'Cadastros' ||
      !selectedSub ||
      manual.sub === selectedSub;

    // Verifica a pesquisa
    const matchSearch =
      !search ||
      manual.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      manual.description
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchCategory && matchSub && matchSearch;
  });

  // A subcategoria só aparece no título quando
  // a categoria atual é "Cadastros".
  const sectionTitle =
    selectedCategory === 'Cadastros' && selectedSub
      ? `${selectedCategory} — ${selectedSub}`
      : selectedCategory;

  // Seleciona uma categoria
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);

    // Ao mudar de categoria, sempre limpa a subcategoria.
    setSelectedSub(null);
  };

  // Seleciona uma subcategoria
  const handleSelectSub = (sub: string) => {
    // Subcategorias só existem para Cadastros.
    if (selectedCategory !== 'Cadastros') {
      return;
    }

    setSelectedSub(sub);
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.layout}>
        <Sidebar
          selectedCategory={selectedCategory}
          selectedSub={selectedSub}
          onSelectCategory={handleSelectCategory}
          onSelectSub={handleSelectSub}
        />

        <main className={styles.content}>
          <section className={styles.hero}>
            <h1>Manuais do Sistema</h1>

            <p>
              Guias passo a passo para cada processo do sistema.
            </p>

            <div className={styles.searchBox}>
              <Search size={18} />

              <input
                type="text"
                placeholder="Pesquisar Manuais..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </section>

          <section className={styles.manualsSection}>
            <h2>{sectionTitle}</h2>

            <div className={styles.grid}>
              {filtered.map((manual, index) => (
                <ManualCard
                  key={index}
                  title={manual.title}
                  description={manual.description}
                  active={manual.active}
                />
              ))}

              {filtered.length === 0 && (
                <p
                  style={{
                    color: '#999',
                    fontSize: 14,
                  }}
                >
                  Nenhum manual encontrado.
                </p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}