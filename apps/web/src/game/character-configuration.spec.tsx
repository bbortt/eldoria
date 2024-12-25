import { Character, newCharacter, Race, Specialization } from '@repo/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CharacterConfiguration } from './character-configuration';

jest.mock('@repo/ui', () => ({
  Input: ({ label, onChange, value }) => <input data-testid={label} onChange={onChange} value={value} />,
}));

jest.mock('@repo/ui/components', () => ({
  DrowdownForListItems: ({ ariaLabel, label, onSelectionChange }) => (
    <select aria-label={ariaLabel} data-testid={ariaLabel} onChange={e => onSelectionChange(new Set([e.target.value]))}>
      <option>{label}</option>
      <option>Human</option>
      <option>Dwarf</option>
      <option>Guardian</option>
      <option>Champion</option>
    </select>
  ),
}));

describe('Character Configuration', () => {
  const mockCharacter: Character = newCharacter('Test Character', Race.HUMAN, Specialization.GUARDIAN);
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders character configuration inputs', () => {
    render(<CharacterConfiguration character={mockCharacter} onChange={mockOnChange} />);

    expect(screen.getByTestId('Name')).toBeInTheDocument();
    expect(screen.getByTestId('Character race selection')).toBeInTheDocument();
    expect(screen.getByTestId('Character specialization selection')).toBeInTheDocument();
  });

  it('calls onChange when name is updated', async () => {
    const user = userEvent.setup();
    render(<CharacterConfiguration character={mockCharacter} onChange={mockOnChange} />);

    const nameInput = screen.getByTestId('Name');

    const name = 'X';
    await user.type(nameInput, name);

    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ name: `${mockCharacter.name}${name}` }));
  });

  it('calls onChange when race is updated', async () => {
    const user = userEvent.setup();
    render(<CharacterConfiguration character={mockCharacter} onChange={mockOnChange} />);

    const raceSelect = screen.getByTestId('Character race selection');
    await user.selectOptions(raceSelect, [Race.DWARF.label]);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('calls onChange when specialization is updated', async () => {
    const user = userEvent.setup();
    render(<CharacterConfiguration character={mockCharacter} onChange={mockOnChange} />);

    const specializationSelect = screen.getByTestId('Character specialization selection');
    await user.selectOptions(specializationSelect, [Specialization.CHAMPION.label]);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays current character values', () => {
    render(<CharacterConfiguration character={mockCharacter} onChange={mockOnChange} />);

    expect(screen.getByTestId('Name')).toHaveValue('Test Character');
    expect(screen.getByTestId('Character race selection')).toHaveTextContent('Human');
    expect(screen.getByTestId('Character specialization selection')).toHaveTextContent('Champion');
  });
});
