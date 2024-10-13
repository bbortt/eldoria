import { reactInternalConfig } from '@repo/eslint-config/react-internal.js';

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: ['components/shared-button.tsx'],
  },
  ...reactInternalConfig({ project: ['./tsconfig.lint.json'], tsconfigRootDir: import.meta.dirname }),
];
