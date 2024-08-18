import { Button } from '@repo/ui/components';

import styles from './main-menu.module.css';

export const MainMenu = () => {
  return (
    <>
      <main className={styles.main}>
        <Button>Start Game</Button>
        <Button>Load Game</Button>
      </main>
    </>
  );
};

export default MainMenu;
