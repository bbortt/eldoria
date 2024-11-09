import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextWithAcceptOrRefuseButtons from './text-with-accept-or-refuse-buttons';

jest.mock('./tutorial.module.css', () => ({
  footer: 'mock-footer-class',
}));

jest.mock('@repo/ui', () => ({
  ButtonGroup: ({ children }) => <div data-testid="button-group">{children}</div>,
}));

jest.mock('@repo/ui/components/default-button', () => {
  return function MockDefaultButton({ children, onClick, color }) {
    return (
      <button onClick={onClick} data-color={color}>
        {children}
      </button>
    );
  };
});

describe('TextWithAcceptOrRefuseButtons', () => {
  const mockAcceptFunction = jest.fn();
  const mockRefuseFunction = jest.fn();
  const mockText = 'Test text';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the text and both buttons', () => {
    render(<TextWithAcceptOrRefuseButtons acceptFunction={mockAcceptFunction} refuseFunction={mockRefuseFunction} text={mockText} />);

    expect(screen.getByText(mockText)).toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Refuse')).toBeInTheDocument();
  });

  it('calls the accept function when the Accept button is clicked', async () => {
    const user = userEvent.setup();
    render(<TextWithAcceptOrRefuseButtons acceptFunction={mockAcceptFunction} refuseFunction={mockRefuseFunction} text={mockText} />);

    const acceptButton = screen.getByText('Accept');
    await user.click(acceptButton);

    expect(mockAcceptFunction).toHaveBeenCalledTimes(1);
    expect(mockRefuseFunction).not.toHaveBeenCalled();
  });

  it('calls the refuse function when the Refuse button is clicked', async () => {
    const user = userEvent.setup();
    render(<TextWithAcceptOrRefuseButtons acceptFunction={mockAcceptFunction} refuseFunction={mockRefuseFunction} text={mockText} />);

    const refuseButton = screen.getByText('Refuse');
    await user.click(refuseButton);

    expect(mockRefuseFunction).toHaveBeenCalledTimes(1);
    expect(mockAcceptFunction).not.toHaveBeenCalled();
  });

  it('applies the correct CSS class and uses ButtonGroup', () => {
    const { container } = render(
      <TextWithAcceptOrRefuseButtons acceptFunction={mockAcceptFunction} refuseFunction={mockRefuseFunction} text={mockText} />,
    );

    const footerElement = container.firstChild;
    expect(footerElement).toHaveClass('mock-footer-class');
    expect(screen.getByTestId('button-group')).toBeInTheDocument();
  });

  it('applies the correct color prop to buttons', () => {
    render(<TextWithAcceptOrRefuseButtons acceptFunction={mockAcceptFunction} refuseFunction={mockRefuseFunction} text={mockText} />);

    const acceptButton = screen.getByText('Accept');
    const refuseButton = screen.getByText('Refuse');

    expect(acceptButton).toHaveAttribute('data-color', 'success');
    expect(refuseButton).toHaveAttribute('data-color', 'warning');
  });
});
