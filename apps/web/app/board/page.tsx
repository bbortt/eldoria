'use client';

import { BotClient, Client, Eldoria, initBot, Local, PlainJSClient } from '@repo/core';
import { useEffect, useMemo, useState } from 'react';

import Board from './board';

export default () => {
  const [client, setClient] = useState<BotClient>();

  const matchID = 'eldoria';
  const botPlayerID = '1';

  const Game: ReturnType<typeof Client> = useMemo(
    () =>
      Client({
        game: Eldoria,
        board: Board,
        multiplayer: Local(),
      }),
    [],
  );

  useEffect(() => {
    const botClient = PlainJSClient({
      game: Eldoria,
      debug: false,
      multiplayer: Local(),
      matchID,
      playerID: '1',
    });

    botClient.start();
    setClient(botClient);

    return () => botClient.stop();
  }, []);

  useEffect(() => {
    if (!client) {
      return;
    }

    return initBot(client, botPlayerID);
  }, [client]);

  // @ts-expect-error TS2786: Game cannot be used as a JSX component.
  return <Game playerID={botPlayerID} matchID={matchID} />;
};
