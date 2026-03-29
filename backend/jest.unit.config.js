module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/jest.env.js"],
  testMatch: ["<rootDir>/tests/unit/**/*.unit.test.js"],
  testTimeout: 30000,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/controllers/**/*.js",
    "src/middleware/**/*.js",
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