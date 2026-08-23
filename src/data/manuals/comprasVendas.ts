import type { ManualSteps } from './types';

// ============================================================
// PASSOS — COMPRAS
// ============================================================

export const comprasSteps: ManualSteps = {
  'Ordem de Compra': [
    {
      description: 'Acesse "Compras → Ordem de Compra"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "+" para nova ordem',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o fornecedor',
      detail: 'mostre detalhes',
    },
    {
      description: 'Adicione os produtos e quantidades desejadas',
      detail: 'mostre detalhes',
    },
    {
      description: 'Informe prazo de entrega e condições de pagamento',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confirme e envie a ordem ao fornecedor',
      detail: 'mostre detalhes',
    },
  ],

  'Nota de Entrada por XML': [
    {
      description: 'Acesse "Compras → Nota de Entrada por XML"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Faça o upload do arquivo XML da NF-e',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confira os produtos e quantidades importados',
      detail: 'mostre detalhes',
    },
    {
      description: 'Vincule os produtos do XML com os cadastros do sistema',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confirme a entrada da nota',
      detail: 'mostre detalhes',
    },
  ],

  // ── Adicione os demais manuais de Compras aqui ──
};

// ============================================================
// PASSOS — VENDAS
// ============================================================

export const vendasSteps: ManualSteps = {
  Pedidos: [
    {
      description: 'Acesse "Vendas → Pedidos"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "+" para novo pedido',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o cliente e a tabela de preços',
      detail: 'mostre detalhes',
    },
    {
      description: 'Adicione os produtos e quantidades',
      detail: 'mostre detalhes',
    },
    {
      description: 'Informe a condição de pagamento e prazo de entrega',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confirme e salve o pedido',
      detail: 'mostre detalhes',
    },
  ],

  'Nota Fiscal Eletronica': [
    {
      description: 'Acesse "Faturamento → NF-e"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o pedido a faturar ou crie uma NF-e avulsa',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confira os dados fiscais e de transporte',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "Emitir" para enviar à SEFAZ',
      detail: 'mostre detalhes',
    },
    {
      description: 'Aguarde a autorização e faça o download do DANFE',
      detail: 'mostre detalhes',
    },
  ],

  // ── Adicione os demais manuais de Vendas aqui ──
};
