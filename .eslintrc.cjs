module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort', 'import', 'react', 'react-hooks'],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-console': 'error',
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'react': {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['assets', './src/assets'],
          ['components', './src/components'],
          ['context', './src/context'],
          ['@constants', './src/constants/index'],
          ['@utils', './src/utils/index'],
          ['@css', './src/css/index'],
          ['@types', './src/types/index'],
        ],
        extensions: ['.tsx', '.ts'],
      },
    },
  },
  ignorePatterns: [
    '/*.css',
    '*.eslintrc.cjs',
    '*.config.cjs',
    '*.config.ts',
    '*.config.js',
    '/dist',
    '/src/**/*.stories.tsx',
  ],
};
