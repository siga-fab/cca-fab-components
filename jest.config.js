module.exports = {
  bail: true,
  collectCoverageFrom: ['**/src/**/*.(component|service).ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  testPathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/e2e/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/*.(js|scss)',
    '<rootDir>/*.(js|scss)',
  ],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 60,
    },
  },
  testMatch: ['**/*.spec.ts'],
  verbose: true,
};
