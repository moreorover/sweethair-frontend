module.exports = {
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest',
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
};
