import type { Config } from 'jest';

const { CI } = process.env;

const config: Config = {
  collectCoverageFrom: ['./components/**'],
  coverageReporters: ['lcov', 'text'],
  modulePathIgnorePatterns: ['<rootDir>/.turbo/', '<rootDir>/node_modules/'],
  reporters: [
    // @ts-expect-error - type incompatibility
    ...(CI ? [['github-actions', { silent: false }], 'summary'] : ['default']),
    // @ts-expect-error - type incompatibility
    ['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }],
  ],
  rootDir: '',
  setupFilesAfterEnv: ['<rootDir>/.jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {}],
  },
};

export default config;
