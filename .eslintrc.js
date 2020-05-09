module.exports = {
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module", // to support ES2015
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true
  },
  rules: {
    quotes: ["error", "single", { avoidEscape: true }],
    "comma-dangle": ["error", "always-multiline"],
    "no-unused-vars": ["error", { varsIgnorePattern: "^_" }]
  },
  settings: {
    react: {
      version: "16.4.2"
    }
  }
};
