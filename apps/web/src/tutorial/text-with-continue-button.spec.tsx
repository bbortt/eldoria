import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextWithContinueButton from './text-with-continue-button';

jest.mock('./tutorial.module.css', () => ({
  footer: 'mock-footer-class',
}));

jest.mock('@repo/ui/components', () => ({
  DefaultButton: function MockDefaultButton({ children, onClick }) {
    return <button onClick={onClick}>{children}</button>;
  },
}));

describe('Text with Continue Button', () => {
  const mockContinueFunction = jest.fn();
  const mockText = 'Test text';

  it('renders the text and continue button', () => {
    render(<TextWithContinueButton continueFunction={mockContinueFunction} text={mockText} />);

    expect(screen.getByText(mockText)).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('calls the continue function when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<TextWithContinueButton continueFunction={mockContinueFunction} text={mockText} />);

    const continueButton = screen.getByText('Continue');
    await user.click(continueButton);

    expect(mockContinueFunction).toHaveBeenCalledTimes(1);
  });

  it('applies the correct CSS class', () => {
    const { container } = render(<TextWithContinueButton continueFunction={mockContinueFunction} text={mockText} />);

    const footerElement = container.firstChild;
    expect(footerElement).toHaveClass('mock-footer-class');
  });
});
