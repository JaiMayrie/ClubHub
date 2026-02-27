module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/jest.env.js"],
  testMatch: ["<rootDir>/tests/unit/**/*.unit.test.js"],
  testTimeout: 30000,
};
