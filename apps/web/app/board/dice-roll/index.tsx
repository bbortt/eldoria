import type { PlayerID } from '@repo/core';
import { DiceRoll as DiceRollType, getPlayerString } from '@repo/core';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@repo/ui';
import { DefaultButton } from '@repo/ui/components';
import React, { useEffect, useState } from 'react';

import styles from './index.module.css';

export interface DiceRollProps {
  diceRoll: DiceRollType;
  playerId: PlayerID;
  rollDice: () => void;
  startingPlayer: string | undefined;
}

export const DiceRoll: React.FC<DiceRollProps> = ({ diceRoll, playerId, rollDice, startingPlayer }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (playerId) {
      // @ts-expect-error TS7053: Element implicitly has an any type because expression of type string can't be used to index type DiceRoll
      setScore(diceRoll[playerId] === 0 ? score : diceRoll[playerId]);
    }
  }, [diceRoll, playerId, score]);

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
          <div className={styles.scoreGrid}>
            <div className="font-bold">Your score:</div>
            <div>{score}</div>
          </div>
          {startingPlayer ? (
            <p className="font-bold" key="you-scored-higher">
              {getPlayerString(startingPlayer, playerId)} scored higher and is the first to move!
            </p>
          ) : (
            <React.Fragment key="placeholder-you-scored-higher"></React.Fragment>
          )}
        </ModalBody>
        <ModalFooter>
          <DefaultButton color="secondary" onPress={rollDice} isDisabled={score !== 0} data-testid="button-roll-dice">
            Roll Dice
          </DefaultButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DiceRoll;
