'use client';

import { useState } from 'react';

import { Input } from '@repo/ui';
import { DefaultButton } from '@repo/ui/components';

import styles from './text-with-input-and-confirm-button.module.css';

export interface TextWithInputAndConfirmButtonProps {
  continueFunction: (username: string) => void;
  text: string;
}

export const TextWithInputAndConfirmButton: React.FC<TextWithInputAndConfirmButtonProps> = ({ continueFunction, text }) => {
  const [textInput, setTextInput] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    continueFunction(textInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setTextInput(e.target.value);

  return (
    <div className={styles.main}>
      <div>
        <div>
          <p>{text}</p>
        </div>
        <div className={styles.flexBoxCenter}>
          <form onSubmit={onSubmit}>
            <div className={styles.inputContainer}>
              <Input
                key="username"
                type="text"
                label="Username"
                value={textInput}
                onChange={handleInputChange}
                variant="bordered"
                color="secondary"
                fullWidth={true}
                isRequired={true}
              />

              <DefaultButton color="secondary" type="submit" isDisabled={!textInput}>
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
