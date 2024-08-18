import styles from './page.module.css';

import MainMenu from '@/layout/main-menu';

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Chronicles of Eldoria <small>The Shadowed Realm</small>
      </h1>

      <MainMenu />

      <footer className={styles.footer}></footer>
    </div>
  );
}
