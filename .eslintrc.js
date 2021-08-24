module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parser: 'vue-eslint-parser',
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    // "@typescript-eslint/no-unused-vars": ["off"],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};
