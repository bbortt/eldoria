/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config = {
  collectCoverageFrom: ['./components/**'],
  coverageReporters: ['lcov', 'text'],
  modulePathIgnorePatterns: ['<rootDir>/.turbo/', '<rootDir>/node_modules/'],
  rootDir: '',
  testEnvironment: 'jsdom',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};

module.exports = config;
