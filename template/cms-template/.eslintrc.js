module.exports = {
  parser: 'babel-eslint',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'airbnb', 
    'prettier', 
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:compat/recommended',
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    APP_TYPE: true,
  },
  rules: {
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/no-extraneous-dependencies': [2, { optionalDependencies: true }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/destructuring-assignment': 'off',
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: true, typedefs: true },
    ],
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
};
