module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/jest.env.js"],
  globalSetup: "<rootDir>/tests/jest.setup-db.js",
  globalTeardown: "<rootDir>/tests/jest.teardown-db.js",
  testMatch: ["<rootDir>/tests/integration/**/*.integration.test.js"],
  testTimeout: 30000,
};
