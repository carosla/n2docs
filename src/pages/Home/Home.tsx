import styles from './Home.module.css';
import logoN2 from '../../assets/logo-n2.png';
import { CardOption } from '../../components/CardOption/CardOption';
import { Rocket, LayoutGrid, FileSearch } from 'lucide-react';

export function Home() {
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
          <CardOption
            icon={<Rocket />}
            title="Primeiros Passos"
            description="Cadastros iniciais, configurações básicas e orientações para começar a utilizar o sistema."
          />

          <CardOption
            icon={<LayoutGrid />}
            title="Módulos do Sistema"
            description="Acesse manuais separados por áreas, como vendas, estoque, financeiro, fiscal e produção."
          />

          <CardOption
            icon={<FileSearch />}
            title="Relatórios e Consultas"
            description="Aprenda a consultar informações, emitir relatórios e acompanhar os resultados da empresa."
          />
        </div>
      </section>
    </main>
  );
}