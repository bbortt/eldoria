import type { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: ['./components/**'],
  coverageReporters: ['lcov', 'text'],
  modulePathIgnorePatterns: ['<rootDir>/.turbo/', '<rootDir>/node_modules/'],
  rootDir: '',
  setupFilesAfterEnv: ['<rootDir>/.jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {}],
  },
};

export default config;
