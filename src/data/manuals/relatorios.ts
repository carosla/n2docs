import type { ManualSteps } from './types';

// ============================================================
// PASSOS — RELATÓRIOS
//
// A chave deve ser idêntica ao título em Manuals.tsx.
// Padrão: 'Rel-NomeDoRelatorio — NomeDoManual'
// ============================================================

export const relatoriosSteps: ManualSteps = {
  // ── DASHBOARD ──────────────────────────────────────────────
  'Painel Gerencial': [
    {
      description: 'Acesse "Relatórios → Dashboard → Painel Gerencial"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o período desejado no filtro superior',
      detail: 'mostre detalhes',
    },
    {
      description: 'Visualize os indicadores de faturamento, estoque e financeiro',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em qualquer card para detalhar o indicador',
      detail: 'mostre detalhes',
    },
  ],

  // ── CONTROLADORIA ──────────────────────────────────────────
  'DRE Gerencial': [
    {
      description: 'Acesse "Relatórios → Controladoria → DRE Gerencial"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o período (mês/ano ou intervalo)',
      detail: 'mostre detalhes',
    },
    {
      description: 'Filtre por centro de custo se necessário',
      detail: 'mostre detalhes',
    },
    {
      description: 'Analise receitas, despesas e resultado líquido',
      detail: 'mostre detalhes',
    },
    {
      description: 'Exporte em PDF ou Excel',
      detail: 'mostre detalhes',
    },
  ],


  // ── VENDAS ─────────────────────────────────────────────────
  'Ranking de Vendedores': [
    {
      description: 'Acesse "Relatórios → Vendas → Ranking de Vendedores"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Defina o período de análise',
      detail: 'mostre detalhes',
    },
    {
      description: 'Visualize o ranking por valor faturado ou quantidade',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique no vendedor para ver detalhes das vendas',
      detail: 'mostre detalhes',
    },
  ],


  // ── ESTOQUE ────────────────────────────────────────────────
  'Posição de Estoque': [
    {
      description: 'Acesse "Relatórios → Estoque → Posição de Estoque"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o depósito ou "Todos"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Visualize saldos por produto, custo médio e valor total',
      detail: 'mostre detalhes',
    },
    {
      description: 'Exporte em Excel para análises externas',
      detail: 'mostre detalhes',
    },
  ],

  

  // ── FATURAMENTO ────────────────────────────────────────────
  'NF-e Emitidas': [
    {
      description: 'Acesse "Relatórios → Faturamento → NF-e Emitidas"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Selecione o período e situação (autorizadas, canceladas)',
      detail: 'mostre detalhes',
    },
    {
      description: 'Visualize a listagem com chave de acesso e valor',
      detail: 'mostre detalhes',
    },
    {
      description: 'Faça download do XML ou DANFE individualmente ou em lote',
      detail: 'mostre detalhes',
    },
  ],

  

  // ── FINANCEIRO ─────────────────────────────────────────────
}