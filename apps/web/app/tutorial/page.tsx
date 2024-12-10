'use client';

import { Character, newCharacter, Race, Specialization } from '@repo/core';
import { AnimatePresence, motion } from '@repo/ui/lib';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { persistConfiguration } from '@/game/configuration';
import { TextWithAcceptOrRefuseButtons, TextWithContinueButton, TextWithInputAndConfirmButton } from '@/tutorial';

import { getTutorialConversation } from './tutorial.conversation';
const tutorialConversation = getTutorialConversation();

import styles from './page.module.css';

export default () => {
  const [index, setIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [team, setTeam] = useState([] as Character[]);

  useEffect(() => {
    if (username) {
      setIndex(i => i + 1);
    }
  }, [username, team]);

  const router = useRouter();

  if (!tutorialConversation[index]) {
    return <></>;
  }

  const { text, backgroundImage, character } = tutorialConversation[index];

  const continueToNextConversation = (): void => setIndex((i: number) => i + 1);
  const startGame = (): void => {
    persistConfiguration({
      username,
      team: [newCharacter(username, Race.HUMAN, Specialization.ARCHER), ...team],
      tutorial: true,
      showHints: true,
    });
    router.push('/board');
  };

  const renderContent = () => {
    if (index <= 3) {
      return <TextWithContinueButton continueFunction={continueToNextConversation} text={text} />;
    } else if (index === 4) {
      return <TextWithInputAndConfirmButton continueFunction={setUsername} text={text} />;
    } else if (index === 5) {
      return <TextWithContinueButton continueFunction={continueToNextConversation} text={text.replace('{0}', username)} />;
    } else if (index >= 6 && index <= 10) {
      if (!character) {
        return <></>;
      }

      return (
        <TextWithAcceptOrRefuseButtons
          acceptFunction={() => setTeam([...team, character])}
          refuseFunction={continueToNextConversation}
          text={text}
        />
      );
    } else if (index === 11) {
      return <TextWithContinueButton continueFunction={startGame} text={text} />;
    }

    return null;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.container}
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
};
