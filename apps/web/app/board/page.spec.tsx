import { render, screen } from '@testing-library/react';

jest.mock('next/dynamic', () =>
  jest.fn(() => {
    const DynamicComponent = () => <div data-testid="mocked-game">Mocked Game Component</div>;
    DynamicComponent.displayName = 'DynamicComponent';
    return DynamicComponent;
  }),
);

import GamePage from './page';

describe('Game Page', () => {
  it('renders the dynamically imported Game component', async () => {
    render(<GamePage />);

    // Wait for the component to be rendered
    const gameComponent = await screen.findByTestId('mocked-game');

    expect(gameComponent).toBeInTheDocument();
    expect(gameComponent).toHaveTextContent('Mocked Game Component');
  });

  it('uses dynamic import with correct options', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const dynamic = require('next/dynamic');
    expect(dynamic).toHaveBeenCalledWith(expect.any(Function), expect.objectContaining({ ssr: false }));
  });
});
