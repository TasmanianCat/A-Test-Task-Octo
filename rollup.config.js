import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'assets/js/main.js', // your entry JS file
  output: {
    file: 'assets/js/bundle.min.js', // bundled output
    format: 'iife', // immediately-invoked function for browser
    sourcemap: true, // optional: source maps for debugging
  },
  plugins: [
    resolve(), // resolve node_modules imports
    commonjs(), // convert CJS modules to ESM
    terser(), // minify for production
  ],
};
