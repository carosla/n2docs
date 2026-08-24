import { useState } from 'react';
import styles from './Manuals.module.css';
import { Search } from 'lucide-react';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ManualCard } from '../../components/ManualCard/ManualCard';
import { ManualDetail } from '../../components/ManualDetail/ManualDetail';
import type { ManualData } from '../../components/ManualDetail/ManualDetail';

// ← ÚNICO import necessário para os passos
import { allSteps } from '../../data/manuals';

// ======================================================
// TIPOS
// ======================================================

type Manual = {
  title: string;
  description: string;
  category: string;
  sub: string | null;
  active: boolean;
  steps?: ManualData['steps'];
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
};

// ======================================================
// GERAÇÃO DOS MANUAIS
// Os passos vêm de allSteps (data/manuals/index.ts).
// Manuais sem passos cadastrados ficam com steps: [].
// ======================================================

const manuaisCadastros: Manual[] = Object.entries(cadastrosManuais).flatMap(
  ([sub, titles]) =>
    titles.map((title) => ({
      title,
      description: `Manual de ${title.toLowerCase()} no sistema.`,
      category: 'Cadastros',
      sub,
      active: true,
      steps: allSteps[title] ?? [],
    }))
);

const manuaisOutros: Manual[] = Object.entries(outrosManuais).flatMap(
  ([category, titles]) =>
    titles.map((title) => ({
      title,
      description: `Manual de ${title.toLowerCase()} no módulo ${category}.`,
      category,
      sub: null,
      active: true,
      steps: allSteps[title] ?? [],
    }))
);

// ======================================================
// RELATÓRIOS
// ======================================================

const relatoriosManuais: Record<string, string[]> = {
  'Rel-Dashboard':     ['Painel Gerencial'],
  'Rel-Controladoria': ['DRE Gerencial', 'Fluxo de Caixa', 'Resumo Financeiro', 'Extrato de Movimentação de Conta'],
  'Rel-Vendas':        ['Vendas por Vendedores', 'Vendas por Produtos', 'Vendas por Clientes'],
  'Rel-Estoque':       ['Posição de Estoque', 'Extrato de movimentação de estoque'],
  'Rel-Compras':       ['Histórico de Compras'],
  'Rel-Faturamento':   ['NF-e Emitidas', 'Livro de Registro'],
  'Rel-Financeiro':    ['Posição Financeira', 'Titulos a receber em aberto/baixados', 'Titulos a pagar em aberto/baixados'],
};

const manuaisRelatorios: Manual[] = Object.entries(relatoriosManuais).flatMap(
  ([category, titles]) =>
    titles.map((title) => ({
      title,
      description: `Relatório de ${title.toLowerCase()}.`,
      category,
      sub: null,
      active: true,
      steps: allSteps[title] ?? [],
    }))
);

const allManuals: Manual[] = [...manuaisCadastros, ...manuaisOutros, ...manuaisRelatorios];

// ======================================================
// COMPONENTE
// ======================================================

export function Manuals() {
  const [selectedCategory, setSelectedCategory] = useState('Todos os manuais');
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [openManual, setOpenManual] = useState<Manual | null>(null);

  const filtered = allManuals.filter((manual) => {
    const matchCategory =
      selectedCategory === 'Todos os manuais' ||
      manual.category === selectedCategory;

    const matchSub =
      selectedCategory !== 'Cadastros' ||
      !selectedSub ||
      manual.sub === selectedSub;

    const matchSearch =
      !search ||
      manual.title.toLowerCase().includes(search.toLowerCase()) ||
      manual.description.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSub && matchSearch;
  });

  const sectionTitle =
    selectedCategory === 'Cadastros' && selectedSub
      ? `${selectedCategory} — ${selectedSub}`
      : selectedCategory.startsWith('Rel-')
      ? `Relatório — ${selectedCategory.replace('Rel-', '')}`
      : selectedCategory;

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedSub(null);
    setOpenManual(null);
  };

  const handleSelectSub = (sub: string) => {
    if (selectedCategory !== 'Cadastros') return;
    setSelectedSub(sub);
    setOpenManual(null);
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
          {openManual ? (
            <ManualDetail
              manual={openManual}
              onBack={() => setOpenManual(null)}
            />
          ) : (
            <>
              <section className={styles.hero}>
                <h1>Manuais do Sistema</h1>
                <p>Guias passo a passo para cada processo do sistema.</p>

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
                      category={manual.category}
                      onClick={() => setOpenManual(manual)}
                    />
                  ))}

                  {filtered.length === 0 && (
                    <p style={{ color: '#999', fontSize: 14 }}>
                      Nenhum manual encontrado.
                    </p>
                  )}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
