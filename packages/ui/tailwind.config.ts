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
            background: '#f2e2c4',
            secondary: '#a6401b',
            foreground: '#592418',
            primary: {
              50: '#fcf5e4',
              100: '#f1e0c0',
              200: '#e7cc9a',
              300: '#deb771',
              400: '#d5a349',
              500: '#bb8930',
              600: '#916b25',
              700: '#674c1a',
              800: '#3f2e0e',
              900: '#180e00',
              foreground: '#f2b56b',
              DEFAULT: '#f2e2c4',
            },
          },
        },
        dark: {
          layout: {},
          colors: {
            background: '#f2e2c4',
            secondary: '#a6401b',
            foreground: '#592418',
            primary: {
              50: '#fcf5e4',
              100: '#f1e0c0',
              200: '#e7cc9a',
              300: '#deb771',
              400: '#d5a349',
              500: '#bb8930',
              600: '#916b25',
              700: '#674c1a',
              800: '#3f2e0e',
              900: '#180e00',
              foreground: '#f2b56b',
              DEFAULT: '#f2e2c4',
            },
          },
        },
      },
    }),
  ],
  presets: [sharedConfig],
};

export default config;
