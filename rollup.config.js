import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/timer.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/timer.mjs.js',
      format: 'esm',
    },
    {
      file: 'dist/timer.umd.js',
      format: 'umd',
      name: 'PreciseTimer',
    }
  ],
  plugins: [resolve(), babel({ babelHelpers: 'bundled' })]
}