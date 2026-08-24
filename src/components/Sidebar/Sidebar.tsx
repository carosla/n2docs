import { useState } from 'react';
import styles from './Sidebar.module.css';
import { BookOpen } from 'lucide-react';

type SidebarProps = {
  selectedCategory: string;
  selectedSub: string | null;
  onSelectCategory: (cat: string) => void;
  onSelectSub: (sub: string) => void;
  // Quando a navegação vem da Home com categoria = 'Cadastros',
  // o submenu já abre automaticamente.
  initialCadastrosOpen?: boolean;
};

const categories = [
  'Todos os manuais',
  'Cadastros',
  'Estoque',
  'Compras',
  'Vendas',
  'Faturamento',
  'Financeiro',
  'Bancos/Cofre',
  'Gráfica',
  'Química',
  'Produção',
  'CRM',
];

const cadastros = [
  'Básicos',
  'Auxiliares',
  'Fiscais',
  'Financeiros',
  'Comerciais',
  'Estoque',
  'EPI',
];

const reports = [
  'Dashboard',
  'Controladoria',
  'Vendas',
  'Estoque',
  'Compras',
  'Faturamento',
  'Financeiro',
];

export function Sidebar({
  selectedCategory,
  selectedSub,
  onSelectCategory,
  onSelectSub,
  initialCadastrosOpen = false,
}: SidebarProps) {
  // Inicializa já aberto se vier da Home com Cadastros selecionado
  const [cadastrosOpen, setCadastrosOpen] = useState(initialCadastrosOpen);

  // Clique em uma categoria normal
  const handleCategoryClick = (category: string) => {
    setCadastrosOpen(false);
    onSelectCategory(category);
  };

  // Clique em Cadastros
  const handleCadastrosClick = () => {
    setCadastrosOpen((previous) => !previous);
    onSelectCategory('Cadastros');
  };

  // Clique em subcategoria
  const handleSubClick = (sub: string) => {
    if (selectedCategory !== 'Cadastros') return;
    onSelectSub(sub);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.group}>
        <h2>CATEGORIAS</h2>

        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={
                selectedCategory === category && !selectedSub
                  ? styles.active
                  : ''
              }
            >
              {selectedCategory === category && !selectedSub && (
                <BookOpen size={14} />
              )}

              {category === 'Cadastros' ? (
                <>
                  <button
                    type="button"
                    className={styles.dropdownButton}
                    onClick={handleCadastrosClick}
                  >
                    Cadastros {cadastrosOpen ? '▾' : '▸'}
                  </button>

                  {cadastrosOpen && (
                    <ul className={styles.submenu}>
                      {cadastros.map((sub) => (
                        <li
                          key={sub}
                          className={
                            selectedCategory === 'Cadastros' &&
                            selectedSub === sub
                              ? styles.activeSub
                              : ''
                          }
                          onClick={() => handleSubClick(sub)}
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <span onClick={() => handleCategoryClick(category)}>
                  {category}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.group}>
        <h2>RELATÓRIOS</h2>

        <ul>
          {reports.map((report) => (
            <li
              key={report}
              className={
                selectedCategory === `Rel-${report}` ? styles.active : ''
              }
              onClick={() => {
                setCadastrosOpen(false);
                onSelectCategory(`Rel-${report}`);
              }}
            >
              <span>{report}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
