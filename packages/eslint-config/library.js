import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginOnlyWarn from 'eslint-plugin-only-warn';

import globals from 'globals';

import ts from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export const libraryConfig = parserOptions =>
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
          ...globals.node,
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
        parserOptions,
      },
    }),
    eslintConfigPrettier,
  );
