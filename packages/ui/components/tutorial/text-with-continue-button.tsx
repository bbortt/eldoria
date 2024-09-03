'use client';

import { Link } from '@nextui-org/react';

import styles from './text-with-continue-button.module.css';

import DefaultButton from '../default-button';

export interface TextWithContinueButtonProps {
  currentIndex: number;
  text: string;
}

export const TextWithContinueButton: React.FC<TextWithContinueButtonProps> = ({ currentIndex, text }) => {
  return (
    <footer className={styles.footer}>
      <p>{text}</p>
      <div>
        <Link href={`/tutorial/${currentIndex + 1}`}>
          <DefaultButton>Continue</DefaultButton>
        </Link>
      </div>
    </footer>
  );
};

export default TextWithContinueButton;
