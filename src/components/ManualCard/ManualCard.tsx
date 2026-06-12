import styles from './ManualCard.module.css';

type ManualCardProps = {
  title?: string;
  description?: string;
  active?: boolean;
};

export function ManualCard({ title, description, active = false }: ManualCardProps) {
  return (
    <article className={`${styles.card} ${active ? styles.active : ''}`}>
      {title && <h3>{title}</h3>}

      {description && <p>{description}</p>}
    </article>
  );
}