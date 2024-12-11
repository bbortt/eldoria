'use client';

import { DefaultButton } from '@repo/ui/components';
import { AnimatePresence, motion } from '@repo/ui/lib';
import Link from 'next/link';
import { useState } from 'react';

import { buttonVariants } from '@/layout/framer-motion.const';

const menuVariants = Object.freeze({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
});

export const MainMenu = () => {
  const [startGame, setStartGame] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {startGame ? (
        <motion.div
          key="start-game-options"
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col gap-y-2 items-center"
          transition={{ duration: 0.3 }}
          variants={menuVariants}
        >
          <motion.div transition={{ delay: 0.1 }} variants={buttonVariants}>
            <Link href="/tutorial">
              <DefaultButton color="secondary">Start Tutorial</DefaultButton>
            </Link>
          </motion.div>
          <motion.div transition={{ delay: 0.2 }} variants={buttonVariants}>
            <Link href="/configuration">
              <DefaultButton color="secondary">Configure Game</DefaultButton>
            </Link>
          </motion.div>
          <motion.div transition={{ delay: 0.3 }} variants={buttonVariants}>
            <DefaultButton color="warning" onPress={() => setStartGame(false)}>
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
          className="flex flex-col gap-y-2 items-center"
          transition={{ duration: 0.3 }}
          variants={menuVariants}
        >
          <motion.div transition={{ delay: 0.1 }} variants={buttonVariants}>
            <DefaultButton color="secondary" onPress={() => setStartGame(true)}>
              Start Game
            </DefaultButton>
          </motion.div>
          <motion.div transition={{ delay: 0.2 }} variants={buttonVariants}>
            <DefaultButton color="secondary">Load Game</DefaultButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainMenu;
