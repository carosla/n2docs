import styles from './CardOption.module.css';

type CardOptionProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function CardOption({ icon, title, description }: CardOptionProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}