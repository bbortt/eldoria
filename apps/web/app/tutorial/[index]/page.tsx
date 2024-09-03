import TextWithContinueButton from '@repo/ui/components/tutorial/text-with-continue-button';

const tutorialConversation: { [key: number]: { text: string; backgroundImage: string } } = {
  1: {
    text: `Beneath the cloak of predawn's embrace, a figure moves with the quiet promise of youth, skirting the edges of Eldoria's grandeur.
    The city, a tapestry of towering aspirations and hushed marketplaces, slumbers under a shroud of uneasy silence, its heartbeats muffled by whispers of shadows yet unseen.`,
    backgroundImage: '/tutorial/introduction.png',
  },
  2: {
    text: `This is your story, etched in the fervor of dreams too vast for the confines of cobblestone realities.
    Armed with naught but the raw edge of daring and a spark of cunning, you stand at the precipice of fate, drawn inexorably to the one haven where chaos births legends: the veiled sanctum of the Thieves' Guild of Eldoria.`,
    backgroundImage: '/tutorial/introduction.png',
  },
  3: {
    text: `Yet, the Guild's embrace is not for the faint of heart, for its thresholds are guarded by riddles and trials, known only to those whose courage outshines the glint of steel in the moonlight.
    A trial awaits in the arena, an ancient dance of destiny where the threads of future are woven or severed.`,
    backgroundImage: '/tutorial/arena.png',
  },
  4: {
    text: `With dawn's first whisper, the city's ancient bones are cast in a tapestry of shadows, and it is here you find yourself, before a gateway shrouded in secrecy, its whispers laden with promise and peril alike.
    Your heart, a drum of war and wonder, echoes the tumultuous cadence of the coming storm.
    "Step forth, child of the shadows," intones a voice, as ethereal as the morning mist, "for the fate of Eldoria is a tapestry in flux, and you seek to claim your thread amongst its hues.
    Prove your mettle, let the Guild be your crucible, your sanctuary, your kin. Falter, and fade into the annals of the forgotten, another wraith in the city's endless lament."
    Drawing a breath that tastes of destiny, you cross the threshold, the gates behind you whispering tales of those who walked this path before.
    Herein lies your odyssey, in the heart of Eldoria, where shadows sing secrets and every choice forges the path of your legacy.`,
    backgroundImage: '/tutorial/arena.png',
  },
};

export default ({ params }: { params: { index: string } }) => {
  const { index } = params;
  const numberIndex: number = +index;

  if (!Object.hasOwn(tutorialConversation, numberIndex)) {
    return <></>;
  }

  const { text, backgroundImage } = tutorialConversation[numberIndex]!;

  if (numberIndex <= 4) {
    return <TextWithContinueButton currentIndex={numberIndex} text={text} backgroundImage={backgroundImage} />;
  }
};

export async function generateStaticParams() {
  return [...Array(4).keys()]
    .map(i => String(i + 1))
    .map(index => ({
      index,
    }));
}
