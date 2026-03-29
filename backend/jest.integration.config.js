module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/jest.env.js"],
  globalSetup: "<rootDir>/tests/jest.setup-db.js",
  globalTeardown: "<rootDir>/tests/jest.teardown-db.js",
  testMatch: ["<rootDir>/tests/integration/**/*.integration.test.js"],
  testTimeout: 30000,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/controllers/**/*.js",
    "src/middleware/**/*.js",
    "src/routes/**/*.js",
  ],
  coverageThreshold: {
    global: {
      lines: 30,
      functions: 30,
      branches: 30,
      statements: 30,
    },
  },
  coverageReporters: ["text", "lcov"],
};