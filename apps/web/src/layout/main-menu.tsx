'use client';

import { useState } from 'react';

import { DefaultButton } from '@repo/ui/components';
import { AnimatePresence, motion } from '@repo/ui/lib';

import styles from './main-menu.module.css';

const buttonVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

export const MainMenu = () => {
  const [startGame, setStartGame] = useState(false);

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {startGame ? (
          <motion.div
            key="start-game-options"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-y-2 items-center"
          >
            <motion.div variants={buttonVariants} transition={{ delay: 0.1 }}>
              <DefaultButton>Start Tutorial</DefaultButton>
            </motion.div>
            <motion.div variants={buttonVariants} transition={{ delay: 0.2 }}>
              <DefaultButton>Configure Game</DefaultButton>
            </motion.div>
            <motion.div variants={buttonVariants} transition={{ delay: 0.3 }}>
              <DefaultButton color="warning" onClick={() => setStartGame(false)}>
                Cancel
              </DefaultButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-options"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-y-2 items-center"
          >
            <motion.div variants={buttonVariants} transition={{ delay: 0.1 }}>
              <DefaultButton onClick={() => setStartGame(true)}>Start Game</DefaultButton>
            </motion.div>
            <motion.div variants={buttonVariants} transition={{ delay: 0.2 }}>
              <DefaultButton>Load Game</DefaultButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MainMenu;
