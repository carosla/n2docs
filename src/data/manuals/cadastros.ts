import type { ManualSteps } from './types';

// ============================================================
// PASSOS — CADASTROS
// Chave = título exato do manual em Manuals.tsx
// ============================================================

export const cadastrosSteps: ManualSteps = {
  Funcionario: [
    {
      description: 'Acesse o menu "Funcionários"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Em seguida, clique no "+" para abrir a tela de cadastro',
      detail: 'mostre detalhes',
    },
    {
      description: 'Primeiro tela de "Dados"\nObrigatório preencher o campo "Nome".',
      detail: 'mostre detalhes',
    },
    {
      description: 'Tela de "Dados pessoais"\nRealize os campos obrigatórios.',
      detail: 'mostre detalhes',
    },
  ],

  Usuario: [
    {
      description: 'Acesse "Configurações → Usuários"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "Novo usuário"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Preencha nome, e-mail e perfil de acesso',
      detail: 'mostre detalhes',
    },
    {
      description: 'Salve e aguarde o e-mail de confirmação',
      detail: 'mostre detalhes',
    },
  ],

  Clientes: [
    {
      description: 'Acesse "Cadastros → Clientes"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "+" para novo cliente',
      detail: 'mostre detalhes',
    },
    {
      description: 'Preencha os dados cadastrais e fiscais',
      detail: 'mostre detalhes',
    },
    {
      description: 'Confirme e salve o cadastro',
      detail: 'mostre detalhes',
    },
  ],

  Fornecedor: [
    {
      description: 'Acesse "Cadastros → Fornecedores"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "+" para novo fornecedor',
      detail: 'mostre detalhes',
    },
    {
      description: 'Informe CNPJ, razão social e contato',
      detail: 'mostre detalhes',
    },
    {
      description: 'Salve o cadastro',
      detail: 'mostre detalhes',
    },
  ],

  'Cadastro de Produto Geral': [
    {
      description: 'Acesse "Cadastros → Produtos"',
      detail: 'mostre detalhes',
    },
    {
      description: 'Clique em "+" para novo produto',
      detail: 'mostre detalhes',
    },
    {
      description: 'Preencha código, descrição, grupo e unidade',
      detail: 'mostre detalhes',
    },
    {
      description: 'Configure os dados fiscais (NCM, CFOP, CST)',
      detail: 'mostre detalhes',
    },
    {
      description: 'Defina preço de venda e custo',
      detail: 'mostre detalhes',
    },
    {
      description: 'Salve o produto',
      detail: 'mostre detalhes',
    },
  ],

  // ── Adicione os demais manuais de Cadastros aqui ──
};
