import { nextui } from '@nextui-org/react';
import sharedConfig from '@repo/tailwind-config/tailwind.config';
import { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Pick<Config, 'darkMode' | 'plugins' | 'presets'> = {
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            background: '#F2B56B',
            foreground: '#FAF3E0',
            primary: {
              50: '#ffece6',
              100: '#f2cac1',
              200: '#e4a89b',
              300: '#d88573',
              400: '#cc644c',
              500: '#b34a33',
              600: '#8c3a27',
              700: '#64291b',
              800: '#3d170e',
              900: '#1b0500',
              DEFAULT: '#F2B56B',
              foreground: '#F7D8A3',
            },
            secondary: '#592418',
            focus: '#E07942',
            divider: '#E07942',
            success: '#87A34B',
            warning: '#E79D3F',
            danger: '#C14C32',
          },
        },
        dark: {
          layout: {},
          colors: {
            background: '#F2B56B',
            foreground: '#FAF3E0',
            primary: {
              50: '#ffece6',
              100: '#f2cac1',
              200: '#e4a89b',
              300: '#d88573',
              400: '#cc644c',
              500: '#b34a33',
              600: '#8c3a27',
              700: '#64291b',
              800: '#3d170e',
              900: '#1b0500',
              DEFAULT: '#F2B56B',
              foreground: '#F7D8A3',
            },
            secondary: '#592418',
            focus: '#F182F6',
            divider: '#E07942',
            success: '#87A34B',
            warning: '#E79D3F',
            danger: '#C14C32',
          },
        },
      },
    }),
  ],
  presets: [sharedConfig],
};

export default config;
