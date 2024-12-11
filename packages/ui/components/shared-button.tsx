'use client';

type SharedButtonProps = {
  appName: string;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SharedButton = ({ appName, children, className }: SharedButtonProps) => {
  return (
    <button className={className} onPress={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </button>
  );
};
