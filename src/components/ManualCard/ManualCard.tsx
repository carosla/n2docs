import styles from './ManualCard.module.css';

// ============================================================
// MAPA DE CORES POR CATEGORIA
// Chave = valor exato de manual.category em Manuals.tsx
// Para adicionar uma nova categoria, basta incluir a entrada.
// ============================================================

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

// Cor padrão para categorias não mapeadas
const DEFAULT_COLOR = '#94a3b8'; // cinza-azulado

// ============================================================

type ManualCardProps = {
  title?:       string;
  description?: string;
  active?:      boolean;
  category?:    string;  // ← NOVO: recebe a categoria para colorir o dot
  onClick?:     () => void;
};

export function ManualCard({
  title,
  description,
  active = false,
  category,
  onClick,
}: ManualCardProps) {
  const dotColor = category
    ? (CATEGORY_COLORS[category] ?? DEFAULT_COLOR)
    : DEFAULT_COLOR;

  return (
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
        title={category ?? ''}
      />
    </article>
  );
}
