import { reactInternalConfig } from '@repo/eslint-config/react-internal.js';
import globals from 'globals';

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactInternalConfig,
  {
    files: ['*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
