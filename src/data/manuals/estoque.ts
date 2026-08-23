import type { ManualSteps } from './types';

// ============================================================
// PASSOS — ESTOQUE
// ============================================================

export const estoqueSteps: ManualSteps = {
  'Entrada de Produto': [
    {
      description: 'Acesse "Estoque → Entrada de Produto"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "+" para nova entrada',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o produto e informe a quantidade',
      detail: 'mostre detalhes',
    },
    {
      description: 'Informe o local de estoque de destino',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confirme a entrada',
      detail: 'mostre detalhes',
    },
  ],

  'Inventário de Estoque': [
    {
      description: 'Acesse "Estoque → Inventário"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o depósito e inicie a contagem',
      detail: 'mostre detalhes',
    },
    {
      description: 'Informe as quantidades físicas encontradas por produto',
      detail: 'mostre detalhes',
    },
    {
      description: 'Revise as divergências entre sistema e contagem',
      detail: 'mostre detalhes',
    },
    {
      description: 'Aprove os ajustes e finalize o inventário',
      detail: 'mostre detalhes',
    },
  ],

  'Transferência Entre Locais de Estoque': [
    {
      description: 'Acesse "Estoque → Transferência"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o local de origem',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o local de destino',
      detail: 'mostre detalhes',
    },
    {
      description: 'Informe os produtos e quantidades a transferir',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confirme a transferência',
      detail: 'mostre detalhes',
    },
  ],

  // ── Adicione os demais manuais de Estoque aqui ──
};
