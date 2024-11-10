import { useEffect, useState } from 'react';

import { DiceRoll as DiceRollType } from '@repo/core';

import { DefaultButton } from '@repo/ui/components';
import { AnimatePresence, Modal, ModalBody, ModalContent, ModalFooter } from '@repo/ui/lib';

import styles from './index.module.css';

export interface DiceRollProps {
  diceRoll: DiceRollType;
  rollDice: () => void;
  startingPlayer: string | undefined;
}

export const DiceRoll: React.FC<DiceRollProps> = ({ diceRoll, rollDice, startingPlayer }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(diceRoll['0'] === 0 ? score : diceRoll['0']);
  }, [diceRoll]);

  return (
    <Modal
      backdrop="blur"
      classNames={{
        body: styles.modalBody,
        footer: styles.modalBody,
      }}
      hideCloseButton={!startingPlayer}
      isDismissable={!!startingPlayer}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ModalContent>
        <ModalBody>
          <h2 className={styles.title}>Dice Roll</h2>
          <p>Let the dices decide who begins.. it's either you or the enemy!</p>
          <AnimatePresence mode="wait">
            <div className={styles.scoreGrid}>
              <div className="font-bold">Your score:</div>
              <div>{score}</div>
            </div>
            {startingPlayer && startingPlayer === '0' ? <p className="font-bold">You scored higher and are the first to move!</p> : null}
            {startingPlayer && startingPlayer !== '0' ? <p className="font-bold">Enemy scored higher and is the first to move!</p> : null}
          </AnimatePresence>
        </ModalBody>
        <ModalFooter>
          <DefaultButton color="secondary" onClick={rollDice} isDisabled={score !== 0} data-testid="button-roll-dice">
            Roll Dice
          </DefaultButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DiceRoll;
