import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextWithInputAndConfirmButton from './text-with-input-and-confirm-button';

jest.mock('./text-with-input-and-confirm-button.module.css', () => ({
  main: 'mock-main-class',
  flexBoxCenter: 'mock-flex-box-center-class',
  inputContainer: 'mock-input-container-class',
}));

jest.mock('@repo/ui', () => ({
  Input: ({ label, value, onChange, isRequired }) => (
    <input aria-label={label} value={value} onChange={onChange} required={isRequired} data-testid="mock-input" />
  ),
}));

jest.mock('@repo/ui/components', () => ({
  DefaultButton: function MockDefaultButton({ children, isDisabled, onClick, type }) {
    return (
      <button onClick={onClick} disabled={isDisabled} type={type}>
        {children}
      </button>
    );
  },
}));

describe('Text with Input and Confirm Button', () => {
  const mockContinueFunction = jest.fn();
  const mockText = 'Test text';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the text, input, and button', () => {
    render(<TextWithInputAndConfirmButton continueFunction={mockContinueFunction} text={mockText} />);

    expect(screen.getByText(mockText)).toBeInTheDocument();
    expect(screen.getByTestId('mock-input')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const user = userEvent.setup();
    render(<TextWithInputAndConfirmButton continueFunction={mockContinueFunction} text={mockText} />);

    const input = screen.getByTestId('mock-input');
    await user.type(input, 'testuser');

    expect(input).toHaveValue('testuser');
  });

  it('disables the button when input is empty', () => {
    render(<TextWithInputAndConfirmButton continueFunction={mockContinueFunction} text={mockText} />);

    const button = screen.getByText('Continue');
    expect(button).toBeDisabled();
  });

  it('enables the button when input is not empty', async () => {
    const user = userEvent.setup();
    render(<TextWithInputAndConfirmButton continueFunction={mockContinueFunction} text={mockText} />);

    const input = screen.getByTestId('mock-input');
    const button = screen.getByText('Continue');

    await user.type(input, 'testuser');

    expect(button).not.toBeDisabled();
  });

  it('calls the continue function with input value when form is submitted using button', async () => {
    const user = userEvent.setup();
    render(<TextWithInputAndConfirmButton continueFunction={mockContinueFunction} text={mockText} />);

    const input = screen.getByTestId('mock-input');
    const button = screen.getByText('Continue');

    const inputValue = 'testuser';
    await user.type(input, inputValue);
    await user.click(button);

    expect(mockContinueFunction).toHaveBeenCalledWith(inputValue);
  });

  it('calls the continue function with input value when form is submitted by hitting ENTER', async () => {
    const user = userEvent.setup();
    render(<TextWithInputAndConfirmButton continueFunction={mockContinueFunction} text={mockText} />);

    const input = screen.getByTestId('mock-input');

    const inputValue = 'testuser';
    await user.type(input, `${inputValue}{enter}`);

    expect(mockContinueFunction).toHaveBeenCalledWith(inputValue);
  });

  it('applies the correct CSS classes', () => {
    const { container } = render(<TextWithInputAndConfirmButton continueFunction={mockContinueFunction} text={mockText} />);

    expect(container.firstChild).toHaveClass('mock-main-class');
    expect(container.querySelector('.mock-flex-box-center-class')).toBeInTheDocument();
    expect(container.querySelector('.mock-input-container-class')).toBeInTheDocument();
  });
});
