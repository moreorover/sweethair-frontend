module.exports = {
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
};
