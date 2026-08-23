import type { ManualSteps } from './types';

// ============================================================
// PASSOS — FINANCEIRO
// ============================================================

export const financeiroSteps: ManualSteps = {
  'Titulos a Receber': [
    {
      description: 'Acesse "Financeiro → Títulos a Receber"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Visualize os títulos em aberto por cliente ou período',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o título desejado para detalhes',
      detail: 'mostre detalhes',
    },
  ],

  'Baixa de Titulos a Receber': [
    {
      description: 'Acesse "Financeiro → Títulos a Receber"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o título a ser baixado',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "Baixar" e informe a data e valor recebido',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confirme a baixa',
      detail: 'mostre detalhes',
    },
  ],

  'Titulos a Pagar': [
    {
      description: 'Acesse "Financeiro → Títulos a Pagar"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Visualize os títulos pendentes por fornecedor ou vencimento',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o título para ver detalhes ou realizar pagamento',
      detail: 'mostre detalhes',
    },
  ],

  'Baixa Titulos a Pagar': [
    {
      description: 'Acesse "Financeiro → Títulos a Pagar"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o título a ser baixado',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "Baixar" e informe forma de pagamento e data',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confirme a baixa',
      detail: 'mostre detalhes',
    },
  ],

  // ── Adicione os demais manuais de Financeiro aqui ──
};
