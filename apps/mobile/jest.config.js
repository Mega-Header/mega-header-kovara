module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { presets: ["module:metro-react-native-babel-preset"] },
    ],
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "^react-native$": "<rootDir>/jest.react-native-mock.js",
    "^expo-router$": "<rootDir>/jest.expo-router-mock.js",
    "^@stellar/wallet-kit$": "<rootDir>/jest.wallet-kit-mock.js",
  },
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
