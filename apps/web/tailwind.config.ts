import nextUIConfig from '@repo/ui/tailwind.config';
import { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Partial<Config> = {
  presets: [nextUIConfig as Config],
};

export default config;
