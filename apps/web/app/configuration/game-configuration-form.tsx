import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Character, MAX_GROUP_SIZE, newCharacter, Race, Specialization } from '@repo/core';

import { ButtonGroup } from '@repo/ui';
import { DefaultButton } from '@repo/ui/components';
import { motion } from '@repo/ui/lib';

import CharacterConfiguration from '@/game/character-configuration';
import { persistConfiguration } from '@/game/configuration';
import { buttonVariants } from '@/layout/framer-motion.const';

import styles from './game-configuration-form.module.css';

const initialAlly = (): Character => newCharacter('', Race.HUMAN, Specialization.HEALER);

export const GameConfigurationForm: React.FC = () => {
  const [allies, setAllies] = useState([initialAlly()]);
  const [alliesValid, setAlliesValid] = useState(false);

  useEffect(() => {
    let isValid = true;

    isValid = isValid && !allies.some((ally: Character) => !ally.name);

    setAlliesValid(isValid);
  }, [allies]);

  const router = useRouter();

  const addAlly = () => {
    setAllies([...allies, initialAlly()]);
  };

  const removeAlly = (index: number) => {
    const updatedAllies = [...allies];
    if (updatedAllies.splice(index, 1).length === 1) {
      setAllies(updatedAllies);
    }
  };

  const handleAllyChange = (index: number, updatedCharacter: Character): void => {
    const updatedAllies = [...allies];
    updatedAllies[index] = newCharacter(
      updatedCharacter.name,
      Race.fromLabel(updatedCharacter.race),
      Specialization.fromLabel(updatedCharacter.specialization),
    );
    setAllies(updatedAllies);
  };

  const startGame = (e: React.FormEvent) => {
    e.preventDefault();

    persistConfiguration({
      username: allies[0]!.name,
      team: allies,
    });

    router.push('/board');
  };

  return (
    <form onSubmit={startGame}>
      <motion.div
        key="configure-game-options"
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col gap-y-2 items-center"
        transition={{ duration: 0.3 }}
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }}
      >
        {allies.map((value, i) => (
          <motion.div
            className={styles.inputContainer}
            key={`character-configuration-${i}`}
            transition={{ delay: 0.1 * allies.length }}
            variants={buttonVariants}
          >
            <CharacterConfiguration character={value} onChange={(updatedCharacter: Character) => handleAllyChange(i, updatedCharacter)} />

            <DefaultButton aria-label="Remove character" color="danger" isIconOnly isDisabled={i === 0} onClick={() => removeAlly(i)}>
              🗑️
            </DefaultButton>
          </motion.div>
        ))}
        <motion.div transition={{ delay: 0.1 * (allies.length + 1) }} variants={buttonVariants}>
          <ButtonGroup>
            <DefaultButton color="secondary" onClick={addAlly} variant="bordered" isDisabled={allies.length >= MAX_GROUP_SIZE}>
              Add Ally
            </DefaultButton>
            <DefaultButton onClick={() => router.push('/')} color="warning">
              Cancel
            </DefaultButton>
            <DefaultButton color="secondary" type="submit" isDisabled={!alliesValid}>
              Start Game
            </DefaultButton>
          </ButtonGroup>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default GameConfigurationForm;
