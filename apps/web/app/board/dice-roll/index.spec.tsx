import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DiceRoll } from './index';

jest.mock('@repo/ui/components', () => ({
  DefaultButton: props => {
    return (
      <button onClick={() => props.onPress()} disabled={props.isDisabled} data-testid={props['data-testid']}>
        {props.children}
      </button>
    );
  },
}));

describe('DiceRoll Component', () => {
  const defaultProps = {
    diceRoll: { '0': 0, '1': 0 },
    rollDice: jest.fn(),
    startingPlayer: undefined,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders initial state correctly', () => {
    render(<DiceRoll {...defaultProps} />);

    expect(screen.getByText('Dice Roll')).toBeInTheDocument();
    expect(screen.getByText("Let the dices decide who begins.. it's either you or the enemy!")).toBeInTheDocument();
    expect(screen.getByText('Your score:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByTestId('button-roll-dice')).toBeEnabled();
  });

  it('updates score when diceRoll changes', () => {
    const { rerender } = render(<DiceRoll {...defaultProps} />);

    // Initial score should be 0
    expect(screen.getByText('0')).toBeInTheDocument();

    // Update props with new dice roll
    rerender(<DiceRoll {...defaultProps} diceRoll={{ '0': 6 }} />);

    // Score should update to 6
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('disables Roll Dice button when score is not 0', () => {
    render(<DiceRoll {...defaultProps} diceRoll={{ '0': 5 }} />);

    const rollButton = screen.getByTestId('button-roll-dice');
    expect(rollButton).toBeDisabled();
  });

  it('calls rollDice when Roll Dice button is clicked', async () => {
    const user = userEvent.setup();
    render(<DiceRoll {...defaultProps} />);

    await user.click(screen.getByTestId('button-roll-dice'));

    expect(defaultProps.rollDice).toHaveBeenCalledTimes(1);
  });

  it('shows player win message when startingPlayer is "0"', () => {
    render(<DiceRoll {...defaultProps} startingPlayer="0" />);

    expect(screen.getByText('Player scored higher and is the first to move!')).toBeInTheDocument();
  });

  it('shows enemy win message when startingPlayer is "1"', () => {
    render(<DiceRoll {...defaultProps} startingPlayer="1" />);

    expect(screen.getByText('Enemy scored higher and is the first to move!')).toBeInTheDocument();
  });

  it('hides close button when startingPlayer is undefined', () => {
    render(<DiceRoll {...defaultProps} />);

    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('shows close button when startingPlayer is defined', () => {
    render(<DiceRoll {...defaultProps} startingPlayer="0" />);

    const closeButton = screen.queryByTestId('button-roll-dice');
    expect(closeButton).toBeInTheDocument();
  });
});
