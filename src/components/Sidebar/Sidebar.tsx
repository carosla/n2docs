import { useState } from 'react';
import styles from './Sidebar.module.css';
import { BookOpen } from 'lucide-react';

const categories = [
  'Todos os manuais',
  'Cadastros',
  'Financeiro',
  'Fiscal',
  'Estoque',
  'Produção',
  'Compras',
  'Vendas',
  'Gráfica',
  'CRM',
  'Bancos/Cofre',
];

const cadastros = [
  'Básicos',
  'Auxiliares',
  'Fiscais',
  'Financeiros',
  'Comerciais',
  'Estoque',
  'EPI'
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

export function Sidebar() {

  const [cadastrosOpen, setCadastrosOpen] = useState(false);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.group}>
        <h2>Categorias</h2>

        <ul>
          {categories.map((category, index) => (
            <li
              key={category}
              className={index === 0 ? styles.active : ''}
            >
              {index === 0 && <BookOpen size={14} />}

              {category === 'Cadastros' ? (
                <>
                  <button
                    type="button"
                    className={styles.dropdownButton}
                    onClick={() => setCadastrosOpen(!cadastrosOpen)}
                  >
                    Cadastros {cadastrosOpen ? '▾' : '▸'}
                  </button>

                  {cadastrosOpen && (
                    <ul className={styles.submenu}>
                      {cadastros.map((cadastro) => (
                        <li key={cadastro}>
                          {cadastro}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <span>{category}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.group}>
        <h2>Relatórios</h2>

        <ul>
          {reports.map((report) => (
            <li key={report}>
              <span>{report}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}