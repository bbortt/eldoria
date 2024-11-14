'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider, type ThemeProviderProps } from 'next-themes';

type ProvidersProps = {
  children: React.ReactNode;
};

type AppUIProviderProps = ProvidersProps & {};

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
