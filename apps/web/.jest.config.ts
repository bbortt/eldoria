import type { Config } from 'jest';
import nextJest from 'next/jest.js';

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
  setupFilesAfterEnv: ['<rootDir>/.jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default createJestConfig(config);
