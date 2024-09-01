import styles from './page.module.css';

const tutorialConversation: { [key: number]: { text: string; backgroundImage: string } } = {
  1: {
    text: `Beneath the cloak of predawn\'s embrace, a figure moves with the quiet promise of youth, skirting the edges of Eldoria\'s grandeur.
     The city, a tapestry of towering aspirations and hushed marketplaces, slumbers under a shroud of uneasy silence, its heartbeats muffled by whispers of shadows yet unseen.`,
    backgroundImage: '/tutorial/introduction.png',
  },
};

export default ({ params }: { params: { index: string } }) => {
  const { index } = params;
  const numberIndex: number = +index;

  if (!tutorialConversation.hasOwnProperty(numberIndex)) {
    return <></>;
  }

  const { text, backgroundImage } = tutorialConversation[numberIndex]!;

  return (
    <div className={styles.container} style={{ backgroundImage: `url(` + backgroundImage + `)` }}>
      <footer className={styles.footer}>
        <p>{text}</p>
      </footer>
    </div>
  );
};

export async function generateStaticParams() {
  return ['1'].map(index => ({
    index,
  }));
}
