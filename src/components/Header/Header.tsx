import styles from './Header.module.css';
import { Menu } from 'lucide-react';

/*
  - ícone azul
  - logo N2docs
  - links de navegação
*/
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.menuIcon}>
          <Menu size={18} />
        </div>

        <strong className={styles.logo}>
          N2<span>docs</span>
        </strong>
      </div>

      <nav className={styles.nav}>
        <a href="#">Docs</a>
        <a href="#">Time</a>
        <a href="#">Atualizações</a>
      </nav>
    </header>
  );
}