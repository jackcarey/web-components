/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    ['jest-ctrf-json-reporter', {
      minimal: true,                  // Optional: Generate a minimal report. Defaults to 'false'. Overrides screenshot and testType when set to true.
    }]
  ],
};