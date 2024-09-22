import type { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: ['./src/**'],
  coverageReporters: ['lcov', 'text'],
  rootDir: '',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {}],
  },
};

export default config;
