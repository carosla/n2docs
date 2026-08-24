import { useState } from 'react';
import styles from './CardOption.module.css';

type CardOptionProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
};

export function CardOption({
  icon,
  title,
  description,
  onClick,
}: CardOptionProps) {
  const [clicking, setClicking] = useState(false);

  const handleClick = () => {
    if (clicking) return;

    // 1. Dispara a animação de zoom
    setClicking(true);

    // 2. Aguarda a animação terminar (300ms) e então navega
    setTimeout(() => {
      setClicking(false);
      onClick?.();
    }, 300);
  };

  return (
    <div
      className={`${styles.card} ${clicking ? styles.zooming : ''}`}
      onClick={handleClick}
    >
      <div className={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
