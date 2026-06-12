import styles from './Manuals.module.css';
import { Search } from 'lucide-react';

import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ManualCard } from '../../components/ManualCard/ManualCard';

/*
  Lista de cards dos manuais.
  Depois isso pode vir de um banco de dados ou API.
*/
const manuals = [
  {
    title: 'Cadastros',
    description:
      'Passo a passo dos cadastros do sistema, incluindo cadastros básicos, auxiliares, fiscais, financeiros, comerciais, estoque e EPI...',
    active: true,
  },
  {title: 'Cadastros',
    description:
      'Passo a passo dos cadastros do sistema, incluindo cadastros básicos, auxiliares, fiscais, financeiros, comerciais, estoque e EPI...',
    active: true,},
  {},
  {},
  {},
  {},
];

export function Manuals() {
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.content}>
          <section className={styles.hero}>
            <h1>Manuais do Sistema</h1>

            <p>
              Guias passo a passo para cada processo do sistema.
            </p>

            <div className={styles.searchBox}>
              <Search size={18} />
              <input
                type="text"
                placeholder="Pesquisar Manuais..."
              />
            </div>
          </section>

          <section className={styles.manualsSection}>
            <h2>Todos os manuais</h2>

            <div className={styles.grid}>
              {manuals.map((manual, index) => (
                <ManualCard
                  key={index}
                  title={manual.title}
                  description={manual.description}
                  active={manual.active}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}