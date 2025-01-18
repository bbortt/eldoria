import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const { CI } = process.env;

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  collectCoverageFrom: ['./app/**', './src/**'],
  coverageReporters: ['lcov', 'text'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'lucide-react': require.resolve('lucide-react'),
  },
  reporters: [
    // @ts-expect-error - type incompatibility
    ...(CI ? [['github-actions', { silent: false }], 'summary'] : ['default']),
    // @ts-expect-error - type incompatibility
    ['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }],
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default createJestConfig(config);
