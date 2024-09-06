'use client';

import { useState } from 'react';

import DefaultButton from '../default-button';

import styles from './text-with-input-and-confirm-button.module.css';

export interface TextWithInputAndConfirmButtonProps {
  // eslint-disable-next-line no-unused-vars
  continueFunction: (username: string) => void;
  text: string;
}

export const TextWithInputAndConfirmButton: React.FC<TextWithInputAndConfirmButtonProps> = ({ continueFunction, text }) => {
  const [username, setUsername] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    continueFunction(username);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  return (
    <div className={styles.main}>
      <div>
        <div>
          <p>{text}</p>
        </div>
        <div className={styles.flexBoxCenter}>
          <form onSubmit={e => onSubmit(e)}>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="Username" aria-label="Username" value={username} onChange={handleInputChange} />
              <DefaultButton type="submit">Continue</DefaultButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TextWithInputAndConfirmButton;
