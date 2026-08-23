import styles from './ManualCard.module.css';

type ManualCardProps = {
  title?: string;
  description?: string;
  active?: boolean;
  onClick?: () => void; // ← NOVO
};

export function ManualCard({
  title,
  description,
  active = false,
  onClick,
}: ManualCardProps) {
  return (
    <article
      className={`${styles.card} ${active ? styles.active : ''}`}
      onClick={onClick} // ← NOVO
    >
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
    </article>
  );
}
