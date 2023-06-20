module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'prettier',
    'airbnb-base',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    'prettier/prettier': 'error',
    'no-alert': 0,
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 0,
    'no-iterator': 0,
    'no-restricted-syntax': [2, 'WithStatement'],
    'func-style': 0,
  },
};
