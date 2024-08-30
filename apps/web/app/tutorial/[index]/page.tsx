import styles from './page.module.css';

const text = {
  1: 'asdf',
};

export const Tutorial = ({ params }: { params: { index: string } }) => {
  const { index } = params;

  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <p>{text[index]}</p>
      </footer>
    </div>
  );
};

export default Tutorial;

export async function generateStaticParams() {
  return ['1'].map(index => ({
    index,
  }));
}
