import { nextJsConfig } from '@repo/eslint-config/next.js';
import globals from 'globals';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    files: ['*.?(m)js', 'scripts/*.?(m)js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
