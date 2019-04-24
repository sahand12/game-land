module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
    commonjs: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/react',
    'prettier/flowtype',
    'prettier/babel',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'eslint-plugin-flowtype'],
  rules: {
    // 'arrow-parens': [1, 'as-needed'],
  },
};

// { settings: { flowtype: { onlyFilesWithFlowAnnotation: true } } }
