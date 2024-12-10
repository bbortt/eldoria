import nextUIConfig from '@repo/ui/tailwind.config';
import { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

/** @type {import('tailwindcss').Config} */
const config: Partial<Config> = {
  presets: [nextUIConfig as Config],
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        '.main-layout': {
          '@apply absolute inset-0 flex items-center justify-center': {},
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
