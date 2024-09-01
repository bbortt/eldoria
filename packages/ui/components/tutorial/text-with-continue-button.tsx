'use client';

import { Link } from '@nextui-org/react';

import styles from './text-with-continue-button.module.css';

import DefaultButton from '../default-button';

export interface TextWithContinueButtonProps {
  backgroundImage: string;
  currentIndex: number;
  text: string;
}

export const TextWithContinueButton: React.FC<TextWithContinueButtonProps> = ({ backgroundImage, currentIndex, text, ...props }) => {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(` + backgroundImage + `)` }}>
      <footer className={styles.footer}>
        <p>{text}</p>
        <div>
          <Link href={`/tutorial/${currentIndex + 1}`}>
            {' '}
            <DefaultButton>Continue</DefaultButton>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default TextWithContinueButton;
