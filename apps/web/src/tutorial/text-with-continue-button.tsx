'use client';

import { DefaultButton } from '@repo/ui/components';

import styles from './tutorial.module.css';

export interface TextWithContinueButtonProps {
  continueFunction: () => void;
  text: string;
}

export const TextWithContinueButton: React.FC<TextWithContinueButtonProps> = ({ continueFunction, text }) => {
  return (
    <footer className={styles.footer}>
      <p>{text}</p>
      <div>
        <DefaultButton onPress={continueFunction}>Continue</DefaultButton>
      </div>
    </footer>
  );
};

export default TextWithContinueButton;
