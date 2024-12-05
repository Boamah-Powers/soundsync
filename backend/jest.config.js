export default {
  testEnvironment: "node",
  verbose: true,
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
