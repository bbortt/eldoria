/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  collectCoverageFrom: ['./src/**'],
  coverageReporters: ['lcov', 'text'],
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
