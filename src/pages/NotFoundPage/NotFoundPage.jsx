import styles from './NotFoundPage.module.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHomeClick = () => {
    navigate('/');
  };
  return (
    <div style={{ backgroundColor: '#000000', height: '100vh' }}>
      <div className={styles.error}>
        <div className={styles.container}>
          <div class={styles.noise}></div>
          <div class={styles.overlay}></div>
          <div class={styles.terminal}>
            <h1>
              Error <span class={styles.errorcode}>404</span>
            </h1>
            <p class={styles.output}>
              The page you are looking for might have been removed, had its name
              changed or is temporarily unavailable.
            </p>
            <p class={styles.output}>
              Please try to{' '}
              <button className={styles.button} onClick={goHomeClick}>
                return to the homepage
              </button>
              .
            </p>
            <p class={styles.output}>Good luck.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
