'use client';

import styles from './tutorial.module.css';

import DefaultButton from '../default-button';

export interface TextWithContinueButtonProps {
  continueFunction: () => void;
  text: string;
}

export const TextWithContinueButton: React.FC<TextWithContinueButtonProps> = ({ continueFunction, text }) => {
  return (
    <footer className={styles.footer}>
      <p>{text}</p>
      <div>
        <DefaultButton onClick={continueFunction}>Continue</DefaultButton>
      </div>
    </footer>
  );
};

export default TextWithContinueButton;
