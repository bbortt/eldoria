import { libraryConfig } from '@repo/eslint-config/library.js';

export default [
  ...libraryConfig({
    project: ['./tsconfig.lint.json'],
    tsconfigRootDir: import.meta.dirname,
  }),
];
