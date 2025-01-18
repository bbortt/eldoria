import type { Config } from 'jest';

const { CI } = process.env;

const config: Config = {
  collectCoverageFrom: ['./src/**'],
  coverageReporters: ['lcov', 'text'],
  reporters: [
    // @ts-expect-error - type incompatibility
    ...(CI ? [['github-actions', { silent: false }], 'summary'] : ['default']),
    // @ts-expect-error - type incompatibility
    ['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }],
  ],
  rootDir: '',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {}],
  },
};

export default config;
