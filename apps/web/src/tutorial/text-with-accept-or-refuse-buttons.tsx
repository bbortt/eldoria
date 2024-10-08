'use client';

import { ButtonGroup } from '@repo/ui';

import styles from './tutorial.module.css';

import DefaultButton from '@repo/ui/components/default-button';

export interface TextWithAcceptOrRefuseButtonsProps {
  acceptFunction: () => void;
  refuseFunction: () => void;
  text: string;
}

export const TextWithAcceptOrRefuseButtons: React.FC<TextWithAcceptOrRefuseButtonsProps> = ({ acceptFunction, refuseFunction, text }) => {
  return (
    <footer className={styles.footer}>
      <p>{text}</p>
      <ButtonGroup>
        <DefaultButton color="success" onClick={acceptFunction}>
          Accept
        </DefaultButton>
        <DefaultButton onClick={refuseFunction} color="warning">
          Refuse
        </DefaultButton>
      </ButtonGroup>
    </footer>
  );
};

export default TextWithAcceptOrRefuseButtons;
