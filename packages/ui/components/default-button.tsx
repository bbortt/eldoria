import { Button, ButtonProps } from '@nextui-org/react';

export interface DefaultButtonProps extends Omit<ButtonProps, 'color'> {
  children: React.ReactNode;
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
