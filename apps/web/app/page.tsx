import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Chronicles of Eldoria <small>The Shadowed Realm</small>
      </h1>

      <main className={styles.main}>
        <button className="btn btn-blue">Start Game</button>
        <button className="btn btn-blue">Load Game</button>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
