import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginOnlyWarn from 'eslint-plugin-only-warn';

import ts from 'typescript-eslint';

import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export const reactInternalConfig = parserOptions =>
  ts.config(
    {
      ignores: ['.turbo/', 'coverage/', 'node_modules/', 'dist/'],
    },
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
        },
      },
    },
    {
      plugins: {
        ['only-warn']: eslintPluginOnlyWarn,
      },
    },
    js.configs.recommended,
    ...compat.extends('turbo'),
    ...ts.config({
      files: ['**/*.js?(x)', '**/*.ts?(x)'],
      extends: [...ts.configs.recommended],
      languageOptions: {
        parserOptions: {
          parserOptions,
        },
      },
    }),
    eslintConfigPrettier,
  );
