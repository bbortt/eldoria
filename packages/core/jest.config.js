/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config = {
  collectCoverageFrom: ['./src/**'],
  coverageReporters: ['lcov', 'text'],
  rootDir: 'src',
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};

module.exports = config;
