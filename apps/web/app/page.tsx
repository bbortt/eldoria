import MainMenu from '@/layout/main-menu';

import styles from './page.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Chronicles of Eldoria <small>The Shadowed Realm</small>
        </h1>
      </div>
      <div className={styles.main}>
        <MainMenu />
      </div>
    </div>
  );
};
