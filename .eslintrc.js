// This file is only used by the IDE and not by the compiler atm
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // enables eslint-config-prettier and eslint-plugin-prettier
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    'no-use-before-define': ['off', { functions: false, classes: false, variables: false }],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowTypedFunctionExpressions: true,
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
};
