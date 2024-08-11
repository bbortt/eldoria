import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#f2e2c4',
        'secondary-bg': '#a6401b',
        'primary-text': '#592418',
        'secondary-text': '#f2b56b',
        outline: '#01060d',
      },
    },
  },
  plugins: [],
};
export default config;
