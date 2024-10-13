import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { DefaultButton, DefaultButtonProps } from './default-button';

jest.mock('@nextui-org/react', () => ({
  Button: ({ children, color, ...props }: DefaultButtonProps) => (
    // @ts-expect-error - 'href' does not match type
    <button data-testid="mock-button" data-color={color} {...props}>
      {children}
    </button>
  ),
}));

describe('Default Button', () => {
  it('renders with default primary color', () => {
    render(<DefaultButton>Test Button</DefaultButton>);
    const button = screen.getByTestId('mock-button');
    expect(button).toHaveAttribute('data-color', 'primary');
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

  it('has "use client" directive at the top of the file', () => {
    const filePath = resolve(__dirname, './default-button.tsx');
    const fileContent = readFileSync(filePath, 'utf8');
    expect(fileContent.trimStart().startsWith("'use client';")).toBeTruthy();
  });
});
