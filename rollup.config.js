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
      peerDepsExternal(),
      alias({
        entries: [
          { find: 'components', replacement: path.resolve(__dirname, './src/components') },
          { find: 'context', replacement: path.resolve(__dirname, './src/context') },
          { find: 'assets', replacement: path.resolve(__dirname, './src/assets') },
          { find: '@constants', replacement: path.resolve(__dirname, './src/constants/index') },
        ],
      }),
      resolve(),
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
        },
      }),
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
