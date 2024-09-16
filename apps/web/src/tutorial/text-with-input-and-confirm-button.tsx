'use client';

import { useState } from 'react';

import { Input } from '@repo/ui';

import DefaultButton from '@repo/ui/components/default-button';

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
              <Input
                key="username"
                type="text"
                label="Username"
                value={username}
                onChange={handleInputChange}
                variant="bordered"
                color="secondary"
                fullWidth={true}
                isRequired={true}
              />

              <DefaultButton color="secondary" type="submit">
                Continue
              </DefaultButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TextWithInputAndConfirmButton;
