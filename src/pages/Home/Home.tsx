import styles from './Home.module.css';
import logoN2 from '../../assets/logo-n2.png';
import { CardOption } from '../../components/CardOption/CardOption';
import { Rocket, LayoutGrid, FileSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <img
          src={logoN2}
          alt="Logo N2 Sistemas"
          className={styles.logo}
        />

        <h1>Comece por aqui!</h1>

        <p className={styles.subtitle}>
          Encontre guias rápidos, tutoriais e orientações para utilizar melhor o sistema.
          Nossa central de ajuda reúne explicações passo a passo sobre os principais recursos,
          desde cadastros básicos até processos mais completos, facilitando o aprendizado e a
          rotina do dia a dia.
        </p>

        <div className={styles.cards}>

          {/* Card 1 → Cadastros, subcategoria Básicos */}
          <CardOption
            icon={<Rocket />}
            title="Primeiros Passos"
            description="Cadastros iniciais, configurações básicas e orientações para começar a utilizar o sistema."
            onClick={() =>
              navigate('/manuais', {
                state: { category: 'Cadastros', sub: 'Básicos' },
              })
            }
          />

          {/* Card 2 → Todos os manuais */}
          <CardOption
            icon={<LayoutGrid />}
            title="Módulos do Sistema"
            description="Acesse manuais separados por áreas, como vendas, estoque, financeiro, fiscal e produção."
            onClick={() =>
              navigate('/manuais', {
                state: { category: 'Todos os manuais', sub: null },
              })
            }
          />

          {/* Card 3 → Relatório Dashboard */}
          <CardOption
            icon={<FileSearch />}
            title="Relatórios e Consultas"
            description="Aprenda a consultar informações, emitir relatórios e acompanhar os resultados da empresa."
            onClick={() =>
              navigate('/manuais', {
                state: { category: 'Rel-Dashboard', sub: null },
              })
            }
          />

        </div>
      </section>
    </main>
  );
}
