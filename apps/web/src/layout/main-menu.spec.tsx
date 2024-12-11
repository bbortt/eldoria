import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MainMenu from './main-menu';

jest.mock('next/link', () => {
  return ({ children }) => children;
});

jest.mock('@repo/ui/components', () => ({
  DefaultButton: ({ children, color, onPress }) => {
    return (
      <button onClick={onPress} className={`bg-${color}`}>
        {children}
      </button>
    );
  },
}));

global.window.scrollTo = jest.fn();

describe('Main Menu', () => {
  it('renders initial menu options', () => {
    render(<MainMenu />);

    expect(screen.getByText('Start Game')).toBeInTheDocument();
    expect(screen.getByText('Load Game')).toBeInTheDocument();
    expect(screen.queryByText('Start Tutorial')).not.toBeInTheDocument();
    expect(screen.queryByText('Configure Game')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('shows start game options when "Start Game" is clicked', async () => {
    const user = userEvent.setup();
    render(<MainMenu />);

    await user.click(screen.getByText('Start Game'));

    await waitFor(() => expect(screen.getByText('Start Tutorial')).toBeInTheDocument());

    expect(screen.getByText('Configure Game')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.queryByText('Start Game')).not.toBeInTheDocument();
    expect(screen.queryByText('Load Game')).not.toBeInTheDocument();
  });

  it('returns to main menu when "Cancel" is clicked', async () => {
    const user = userEvent.setup();
    render(<MainMenu />);

    await user.click(screen.getByText('Start Game'));
    await waitFor(() => expect(screen.getByText('Cancel')).toBeInTheDocument());
    await user.click(screen.getByText('Cancel'));

    await waitFor(() => expect(screen.getByText('Start Game')).toBeInTheDocument());

    expect(screen.getByText('Load Game')).toBeInTheDocument();
    expect(screen.queryByText('Start Tutorial')).not.toBeInTheDocument();
    expect(screen.queryByText('Configure Game')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('renders buttons with correct colors', async () => {
    const user = userEvent.setup();
    render(<MainMenu />);

    expect(screen.getByText('Start Game')).toHaveClass('bg-secondary');
    expect(screen.getByText('Load Game')).toHaveClass('bg-secondary');

    await user.click(screen.getByText('Start Game'));

    await waitFor(() => expect(screen.getByText('Start Tutorial')).toHaveClass('bg-secondary'));

    expect(screen.getByText('Configure Game')).toHaveClass('bg-secondary');
    expect(screen.getByText('Cancel')).toHaveClass('bg-warning');
  });
});
