'use client';

import { forwardRef } from 'react';

import { Button, ButtonProps } from '@nextui-org/react';

export interface DefaultButtonProps extends Omit<ButtonProps, 'color'> {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  type?: 'button' | 'submit';
}

export const DefaultButton = forwardRef<HTMLButtonElement, DefaultButtonProps>(
  ({ children, color = 'primary', type = 'button', ...props }, ref) => {
    return (
      <Button color={color} ref={ref} type={type} {...props}>
        {children}
      </Button>
    );
  },
);

export default DefaultButton;
