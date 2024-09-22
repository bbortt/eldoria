'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Character } from '@repo/core';
import { AnimatePresence, motion } from '@repo/ui/lib';

import { persistConfiguration } from '@/game/configuration';
import { TextWithAcceptOrRefuseButtons, TextWithContinueButton, TextWithInputAndConfirmButton } from '@/tutorial';

import tutorialConversation from './tutorial.conversation';

import styles from './page.module.css';

export default () => {
  const [index, setIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [allies, setAllies] = useState([] as Character[]);

  useEffect(() => {
    if (username) {
      setIndex(i => i + 1);
    }
  }, [username, allies]);

  const router = useRouter();

  if (!Object.hasOwn(tutorialConversation, index)) {
    return null;
  }

  const { text, backgroundImage, character } = tutorialConversation[index]!;

  const continueToNextConversation = (): void => setIndex((i: number) => i + 1);
  const startGame = (): void => {
    persistConfiguration({ username, allies: allies });
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
      return (
        <TextWithAcceptOrRefuseButtons
          acceptFunction={() => setAllies([...allies, character!])}
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
