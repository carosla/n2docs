// ============================================================
// INDEX — DATA/MANUALS
//
// Importa e une todos os arquivos de passos.
// Em Manuals.tsx, importe apenas daqui:
//
//   import { allSteps } from '../../data/manuals';
//
// Para adicionar um novo módulo:
//   1. Crie src/data/manuals/meuModulo.ts
//   2. Exporte um objeto do tipo ManualSteps
//   3. Importe e adicione no spread abaixo
// ============================================================

export type { Step, ManualSteps } from './types';

import { cadastrosSteps }        from './cadastros';
import { financeiroSteps }       from './financeiro';
import { estoqueSteps }          from './estoque';
import { comprasSteps, vendasSteps } from './comprasVendas';

export const allSteps = {
  ...cadastrosSteps,
  ...financeiroSteps,
  ...estoqueSteps,
  ...comprasSteps,
  ...vendasSteps,
};
