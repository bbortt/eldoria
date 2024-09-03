'use client';

import DefaultButton from '../default-button';

import styles from './text-with-input-and-confirm-button.module.css';

export interface TextWithInputAndConfirmButtonProps {
  text: string;
}

export const TextWithInputAndConfirmButton: React.FC<TextWithInputAndConfirmButtonProps> = ({ text }) => {
  return (
    <div className={styles.main}>
      <div>
        <div>
          <p>{text}</p>
        </div>
        <div className={styles.flexBoxCenter}>
          <form onSubmit={e => e.preventDefault()}>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="Username" aria-label="Username" />
              <DefaultButton type="submit">Continue</DefaultButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TextWithInputAndConfirmButton;
