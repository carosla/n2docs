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
  return (
    <div
      className={styles.card}
      onClick={onClick}
    >
      <div className={styles.icon}>{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}