/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config = {
  collectCoverageFrom: ['./app/**', './src/**'],
  coverageReporters: ['lcov', 'text'],
  modulePathIgnorePatterns: ['<rootDir>/.turbo/', '<rootDir>/node_modules/'],
  rootDir: '',
  testEnvironment: 'jsdom',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};

module.exports = config;
