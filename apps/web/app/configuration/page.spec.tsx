import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useRouter } from 'next/navigation';

import { persistConfiguration } from '@/game/configuration';

import CharacterConfigurationPage from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/game/configuration', () => ({
  persistConfiguration: jest.fn(),
}));

jest.mock('@/game/character-configuration', () => {
  return jest.fn(({ character, onChange }) => (
    <div data-testid="character-config">
      <input data-testid="name-input" value={character.name} onChange={e => onChange({ ...character, name: e.target.value })} />
    </div>
  ));
});

jest.mock('@repo/ui', () => ({
  ButtonGroup: ({ children }) => <div data-testid="button-group">{children}</div>,
}));

jest.mock('@repo/ui/components', () => ({
  DefaultButton: ({ children, onClick, isDisabled }) => (
    <button onClick={onClick} disabled={isDisabled} data-testid={`button-${children}`}>
      {children}
    </button>
  ),
}));

jest.mock('@repo/ui/lib', () => ({
  AnimatePresence: ({ children }) => children,
  motion: {
    div: ({ children }) => <div>{children}</div>,
  },
  Modal: ({ children }) => <div data-testid="modal">{children}</div>,
  ModalContent: ({ children }) => <div>{children}</div>,
  ModalBody: ({ children }) => <div>{children}</div>,
}));

global.window.scrollTo = jest.fn();

describe('CharacterConfigurationPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders the initial character configuration', () => {
    render(<CharacterConfigurationPage />);
    expect(screen.getByTestId('character-config')).toBeInTheDocument();
    expect(screen.getByTestId('button-Add Ally')).toBeInTheDocument();
    expect(screen.getByTestId('button-Cancel')).toBeInTheDocument();
    expect(screen.getByTestId('button-Start Game')).toBeInTheDocument();
  });

  it('adds a new ally when "Add Ally" button is clicked', async () => {
    const user = userEvent.setup();
    render(<CharacterConfigurationPage />);

    const addButton = screen.getByTestId('button-Add Ally');
    await user.click(addButton);

    await waitFor(() => expect(screen.getAllByTestId('character-config')).toHaveLength(2));
  });

  it('removes an ally when remove button is clicked', async () => {
    const user = userEvent.setup();
    render(<CharacterConfigurationPage />);

    const addButton = screen.getByTestId('button-Add Ally');
    await user.click(addButton);

    await waitFor(() => expect(screen.getAllByTestId('character-config')).toHaveLength(2));

    const removeButtons = screen.getAllByText('🗑️');
    await user.click(removeButtons[1]); // Click the second remove button

    await waitFor(() => expect(screen.getAllByTestId('character-config')).toHaveLength(1));
  });

  it('disables "Start Game" button when ally name is empty', async () => {
    const user = userEvent.setup();
    render(<CharacterConfigurationPage />);

    const startButton = screen.getByTestId('button-Start Game');
    expect(startButton).toBeDisabled();

    const nameInput = screen.getByTestId('name-input');
    await user.type(nameInput, 'Test Character');

    await waitFor(() => expect(startButton).not.toBeDisabled());
  });

  it('starts game when form is submitted ("Start Game" button click)', async () => {
    const user = userEvent.setup();
    render(<CharacterConfigurationPage />);

    const nameInput = screen.getByTestId('name-input');
    const username = 'Test Character';
    await user.type(nameInput, username);

    const startButton = screen.getByTestId('button-Start Game');
    await user.click(startButton);

    await waitFor(() =>
      expect(persistConfiguration).toHaveBeenCalledWith({
        username,
        team: [expect.objectContaining({ name: username })],
      }),
    );
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/board'));
  });

  it('navigates back to homepage when "Cancel" button is clicked', async () => {
    const user = userEvent.setup();
    render(<CharacterConfigurationPage />);

    const cancelButton = screen.getByTestId('button-Cancel');
    await user.click(cancelButton);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });
});
