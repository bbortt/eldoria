import { nextConfig } from '@repo/eslint-config/next.js';

export default [
  ...nextConfig({ project: ['./tsconfig.lint.json'], tsconfigRootDir: import.meta.dirname }),
  {
    files: ['scripts/*'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
];
