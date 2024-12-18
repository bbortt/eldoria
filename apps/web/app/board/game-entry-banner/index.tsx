import { DefaultButton } from '@repo/ui/components';

import styles from '../board.module.css';

export interface GameEntryBannerProps {
  close: () => void;
}

export const GameEntryBanner: React.FC<GameEntryBannerProps> = ({ close }) => {
  return (
    <div className={styles.introductionText} data-testid="game-explanation">
      <p className="w-[50vw]">
        Beneath Eldoria’s shimmering veneer—a city both fragile and ferocious, a dance of towering ambitions and whispered secrets—there
        exists a truth rarely spoken aloud. The Thieves’ Guild, whispered of in shadowed alleys and scrawled in half-hearted proclamations,
        is not the scourge some might imagine. No, their fingers may dance across purse strings and lockpicks, but their purpose delves far
        deeper than mere mischief.
      </p>
      <p className="w-[50vw]">
        For Eldoria rests precariously on the edge of chaos, a bright crown balanced atop the yawning maw of the underworld. Beneath its
        cobbled streets and glittering spires lies a labyrinth of ancient tunnels, a vast and shifting expanse where the dregs of the world
        convene. Beasts that should not have names, whispers that curdle thought itself, and dangers unseen crawl forth from this abyss,
        threatening to sunder the city above.
      </p>
      <p className="w-[50vw]">
        The Guild, for all its roguish swagger, is Eldoria’s first—and often only—line of defense. Their silent blades and unseen movements
        do not merely plunder; they guard. It is their watchful eyes and deft hands that keep the horrors below from ascending into the
        light. And so, the people of Eldoria, pragmatic to their core, have come to an unspoken accord. Let the Guild go about their
        business, for their business is all that keeps Eldoria's dreams aloft.
      </p>
      <p className="w-[50vw]">
        But now, the tides of darkness rise. Enemies gather, cunning and relentless, seeking to breach the heart of the city: the Core. This
        sacred nexus is no mere stonework—it is a threshold, the fragile seal between light and shadow. If they reach it, the underworld
        will spill forth, devouring all.
      </p>
      <p className="w-[50vw]">
        You stand here, not as an observer but as a defender, summoned by fate and bound by resolve. The Core must be protected. Eldoria’s
        future lies in your hands, even as its people slumber, unaware of the storm you will face in their name.
      </p>

      <DefaultButton color="secondary" onPress={() => close()} data-testid="button-close-game-explanation">
        Understood
      </DefaultButton>
    </div>
  );
};

export default GameEntryBanner;
