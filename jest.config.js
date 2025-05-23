const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^react-markdown$": "<rootDir>/__mocks__/react-markdown.tsx",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/(?!react-markdown).+\\.js$"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};

export default config;
