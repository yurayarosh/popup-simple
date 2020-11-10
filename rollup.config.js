import babel from '@rollup/plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'index.js',
      name: 'Popup',
      format: 'umd',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**', // only transpile our source code
      }),
      uglify(),
    ],
  },
  {
    input: 'src/main.js',
    output: [
      {
        file: 'index.es.js',
        format: 'es',
      },
    ],
  },
  {
    input: 'src/test.js',
    output: {
      file: 'test.js',
      format: 'cjs',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**', // only transpile our source code
      }),
    ],
  },
]
