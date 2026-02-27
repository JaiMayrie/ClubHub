module.exports = {
  testEnvironment: "node",
  globalSetup: "<rootDir>/tests/jest.setup-db.js",
  globalTeardown: "<rootDir>/tests/jest.teardown-db.js",
  testTimeout: 30000,
};
