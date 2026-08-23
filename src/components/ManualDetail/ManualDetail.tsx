import { ChevronLeft } from 'lucide-react';
import styles from './ManualDetail.module.css';

export type Step = {
  description: string;
  detail?: string;
};

export type ManualData = {
  title: string;
  description: string;
  category: string;
  sub?: string | null;
  steps?: Step[];
};

type ManualDetailProps = {
  manual: ManualData;
  onBack: () => void;
};

export function ManualDetail({ manual, onBack }: ManualDetailProps) {
  return (
    <div className={styles.wrapper}>

      {/* Breadcrumb */}
      <button className={styles.breadcrumb} onClick={onBack}>
        <ChevronLeft size={14} />
        Todos os cadastros
      </button>

      {/* Cabeçalho do manual */}
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Cadastro de {manual.title}</h1>
            <span className={styles.badge}>
              O primeiro passo para utilizar o sistema N2.
            </span>
          </div>
          <p className={styles.description}>{manual.description}</p>
        </div>
      </div>

      {/* Preview box cinza */}
      <div className={styles.previewBox} />

      {/* Passos */}
      {manual.steps && manual.steps.length > 0 && (
        <ol className={styles.steps}>
          {manual.steps.map((step, index) => (
            <li key={index} className={styles.step}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepBody}>
                <p className={styles.stepDesc}>{step.description}</p>
                {step.detail && (
                  <button className={styles.detailLink}>
                    {step.detail}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
