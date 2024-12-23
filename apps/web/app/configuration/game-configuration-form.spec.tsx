import { DefaultButtonProps } from '@repo/ui/components';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

import { persistConfiguration } from '@/game/configuration';

import GameConfigurationForm from './game-configuration-form';

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
  Checkbox: props => <div data-testid={props['data-testid']}>{props.children}</div>,
}));

jest.mock('@repo/ui/components', () => ({
  DefaultButton: (props: DefaultButtonProps) => {
    const { children, onPress, isDisabled } = props;

    return (
      <button onClick={onPress} disabled={isDisabled} data-testid={props['data-testid']}>
        {children}
      </button>
    );
  },
}));

jest.mock('@repo/ui/lib', () => ({
  motion: {
    div: ({ children }) => <div>{children}</div>,
  },
}));

global.window.scrollTo = jest.fn();

describe('GameConfigurationForm', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders the initial character configuration', () => {
    render(<GameConfigurationForm />);
    expect(screen.getByTestId('character-config')).toBeInTheDocument();
    expect(screen.getByTestId('button-add-ally')).toBeInTheDocument();
    expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
    expect(screen.getByTestId('button-start-game')).toBeInTheDocument();
  });

  it('adds a new ally when "Add Ally" button is clicked', async () => {
    const user = userEvent.setup();
    render(<GameConfigurationForm />);

    const addButton = screen.getByTestId('button-add-ally');
    await user.click(addButton);

    await waitFor(() => expect(screen.getAllByTestId('character-config')).toHaveLength(2));
  });

  it('removes an ally when remove button is clicked', async () => {
    const user = userEvent.setup();
    render(<GameConfigurationForm />);

    const addButton = screen.getByTestId('button-add-ally');
    await user.click(addButton);

    await waitFor(() => expect(screen.getAllByTestId('character-config')).toHaveLength(2));

    const removeButtons = screen.getAllByTestId('button-remove-character');
    await user.click(removeButtons[1]); // Click the second remove button

    await waitFor(() => expect(screen.getAllByTestId('character-config')).toHaveLength(1));
  });

  it('disables "Start Game" button when ally name is empty', async () => {
    const user = userEvent.setup();
    render(<GameConfigurationForm />);

    const startButton = screen.getByTestId('button-start-game');
    expect(startButton).toBeDisabled();

    const nameInput = screen.getByTestId('name-input');
    await user.type(nameInput, 'Test Character');

    await waitFor(() => expect(startButton).not.toBeDisabled());
  });

  it('starts game when form is submitted ("Start Game" button click)', async () => {
    const user = userEvent.setup();
    render(<GameConfigurationForm />);

    const nameInput = screen.getByTestId('name-input');
    const username = 'Test Character';
    await user.type(nameInput, username);

    const startButton = screen.getByTestId('button-start-game');
    await user.click(startButton);

    await waitFor(() =>
      expect(persistConfiguration).toHaveBeenCalledWith({
        username,
        team: [expect.objectContaining({ name: username })],
        tutorial: false,
        showHints: true,
      }),
    );
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/board'));
  });

  it('starts game with disabled hints when form is submitted ("Start Game" button click)', async () => {
    const user = userEvent.setup();
    render(<GameConfigurationForm />);

    const nameInput = screen.getByTestId('name-input');
    const username = 'Test Character';
    await user.type(nameInput, username);

    const showHintsCheckbox = screen.getByTestId('checkbox-show-hints');
    await user.click(showHintsCheckbox);

    const startButton = screen.getByTestId('button-start-game');
    await user.click(startButton);

    await waitFor(() =>
      expect(persistConfiguration).toHaveBeenCalledWith({
        username,
        team: [expect.objectContaining({ name: username })],
        tutorial: false,
        showHints: true,
      }),
    );
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/board'));
  });

  it('navigates back to homepage when "Cancel" button is clicked', async () => {
    const user = userEvent.setup();
    render(<GameConfigurationForm />);

    const cancelButton = screen.getByTestId('button-cancel');
    await user.click(cancelButton);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });
});
