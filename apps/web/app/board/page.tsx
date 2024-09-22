import dynamic from 'next/dynamic';

const Game = dynamic(() => import('./game'), {
  ssr: false,
});

export default () => {
  return <Game />;
};
