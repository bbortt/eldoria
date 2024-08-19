import { Button, ButtonProps } from '@nextui-org/react'; // Assuming you're using Next UI
import React from 'react';

export interface DefaultButtonProps extends Omit<ButtonProps, 'color'> {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({ children, color = 'secondary', ...props }) => {
  return (
    <Button color={color} className="text-primary" {...props}>
      {children}
    </Button>
  );
};

export default DefaultButton;
