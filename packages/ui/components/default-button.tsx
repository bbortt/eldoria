'use client';

import { Button, ButtonProps } from '@nextui-org/react';

export interface DefaultButtonProps extends Omit<ButtonProps, 'color'> {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  type?: 'button' | 'submit';
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({ children, color = 'secondary', type = 'button', ...props }) => {
  return (
    <Button color={color} className="text-primary" type={type} {...props}>
      {children}
    </Button>
  );
};

export default DefaultButton;
