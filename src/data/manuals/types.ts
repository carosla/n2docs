// ============================================================
// TIPOS COMPARTILHADOS
// Importe este arquivo em qualquer lugar que precise dos tipos.
// ============================================================

export type Step = {
  description: string;
  detail?: string; // texto do link "mostre detalhes"
};

export type ManualSteps = {
  [title: string]: Step[];
};
