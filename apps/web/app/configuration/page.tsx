'use client';

import { MAX_GROUP_SIZE } from '@repo/core';
import { Modal, ModalBody, ModalContent } from '@repo/ui';
import { AnimatePresence } from '@repo/ui/lib';

import GameConfigurationForm from './game-configuration-form';

import styles from './page.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <Modal
        backdrop="blur"
        classNames={{
          body: styles.modalBody,
        }}
        hideCloseButton={true}
        isOpen={true}
      >
        <ModalContent>
          <ModalBody>
            <h2 className={styles.title}>Game Configuration</h2>
            <p>You can add up to {MAX_GROUP_SIZE} allies for the upcoming battle. The smaller your group is, the harder it gets.</p>
            <AnimatePresence mode="wait">
              <GameConfigurationForm />
            </AnimatePresence>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
