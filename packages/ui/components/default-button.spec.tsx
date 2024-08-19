import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import DefaultButton from './default-button';

jest.mock('@nextui-org/react', () => ({
  Button: ({ children, color, ...props }: MockButtonProps) => (
    <button data-testid="mock-button" data-color={color} {...props}>
      {children}
    </button>
  ),
}));

describe('DefaultButton', () => {
  it('renders with default secondary color', () => {
    render(<DefaultButton>Test Button</DefaultButton>);
    const button = screen.getByTestId('mock-button');
    expect(button).toHaveAttribute('data-color', 'secondary');
    expect(button).toHaveTextContent('Test Button');
  });

  it('renders with specified color', () => {
    render(<DefaultButton color="danger">Danger Button</DefaultButton>);
    const button = screen.getByTestId('mock-button');
    expect(button).toHaveAttribute('data-color', 'danger');
    expect(button).toHaveTextContent('Danger Button');
  });

  it('passes through other props', () => {
    render(<DefaultButton disabled>Disabled Button</DefaultButton>);
    const button = screen.getByTestId('mock-button');
    expect(button).toBeDisabled();
  });

  it('renders with different colors', () => {
    const { rerender } = render(<DefaultButton color="primary">Primary Button</DefaultButton>);
    let button = screen.getByTestId('mock-button');
    expect(button).toHaveAttribute('data-color', 'primary');

    rerender(<DefaultButton color="success">Success Button</DefaultButton>);
    button = screen.getByTestId('mock-button');
    expect(button).toHaveAttribute('data-color', 'success');

    rerender(<DefaultButton color="warning">Warning Button</DefaultButton>);
    button = screen.getByTestId('mock-button');
    expect(button).toHaveAttribute('data-color', 'warning');
  });
});
