module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort', 'import', 'react'],
  extends: [
    'prettier',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-console': 'error',
  },
  overrides: [
    {
      files: ['*stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
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
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@context', './src/context'],
          ['@decorators', './src/decorators'],
          ['@hooks', './src/hooks'],
          ['@constants', './src/constants/index'],
          ['@utils', './src/utils/index'],
          ['@types', './src/types/index'],
        ],
        extensions: ['.tsx', '.ts'],
      },
    },
  },
  ignorePatterns: ['__test__/**/*', '*.eslintrc.cjs', '*.config.cjs', '*.config.ts', '*.config.js', '/dist'],
};
