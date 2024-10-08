'use client';

import { Button, ButtonProps } from '@nextui-org/react';

export interface DefaultButtonProps extends Omit<ButtonProps, 'color'> {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  type?: 'button' | 'submit';
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({ children, color = 'primary', type = 'button', ...props }) => {
  return (
    <Button color={color} type={type} {...props}>
      {children}
    </Button>
  );
};

export default DefaultButton;
