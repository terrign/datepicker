/** @type {import('rollup').RollupOptions} */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json' assert { type: 'json' };
import alias from '@rollup/plugin-alias';
import cleaner from 'rollup-plugin-cleaner';
import path from 'path';
import { fileURLToPath } from 'url';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import image from '@rollup/plugin-image';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      alias({
        entries: [
          { find: 'components', replacement: path.resolve(__dirname, './src/components') },
          { find: 'context', replacement: path.resolve(__dirname, './src/context') },
          { find: 'assets', replacement: path.resolve(__dirname, './src/assets') },
          { find: '@constants', replacement: path.resolve(__dirname, './src/constants/index') },
          { find: '@utils', replacement: path.resolve(__dirname, './src/utils/index') },
          { find: '@types', replacement: path.resolve(__dirname, './src/types/index') },
        ],
      }),
      resolve(),
      peerDepsExternal(),
      cleaner({
        targets: ['./dist/'],
      }),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['./**/*.stories.*', './**/*.test.*'],
        compilerOptions: {
          declaration: true,
          declarationDir: 'types',
          declarationMap: true,
          emitDeclarationOnly: true,
        },
      }),
      terser(),
      image(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      alias({
        entries: [
          { find: 'components', replacement: path.resolve(__dirname, './dist/esm/types/components') },
          { find: 'context', replacement: path.resolve(__dirname, './dist/esm/types/context') },
          { find: 'assets', replacement: path.resolve(__dirname, './dist/esm/types/assets') },
          { find: '@constants', replacement: path.resolve(__dirname, './dist/esm/types/constants/index') },
          { find: '@utils', replacement: path.resolve(__dirname, './dist/esm/types/utils/index') },
          { find: '@types', replacement: path.resolve(__dirname, './dist/esm/types/types/index') },
        ],
      }),
      dts(),
    ],
  },
];
