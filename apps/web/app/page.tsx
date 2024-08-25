import styles from './page.module.css';

import MainMenu from '@/layout/main-menu';

export const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Chronicles of Eldoria <small>The Shadowed Realm</small>
        </h1>
      </header>
      <main className={styles.main}>
        <MainMenu />
      </main>
    </div>
  );
};

export default Home;
