'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider, type ThemeProviderProps } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

// TODO: Remove, once `AppUIProviderProps` has additional props
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppUIProviderProps extends ProvidersProps {}

export const AppUIProvider = ({ children }: AppUIProviderProps) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

type NextThemeProviderProps = ProvidersProps & {
  themeProps?: ThemeProviderProps;
};

export const NextThemeProvider = ({ children, themeProps }: NextThemeProviderProps) => {
  return (
    <ThemeProvider defaultTheme="system" themes={['light', 'dark', 'system']} forcedTheme={'light'} {...themeProps}>
      {children}
    </ThemeProvider>
  );
};
