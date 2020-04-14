import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const isProd = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'cjs' },
  ],
  plugins: [
    svelte({ dev: !isProd }),
    isProd &&
      babel({
        extensions: ['.js', '.mjs', '.jsx', '.html', '.svelte'],
        include: ['src/**/*'],
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: [
                  'last 2 Chrome versions',
                  'last 2 Safari versions',
                  'last 2 iOS versions',
                  'last 2 Edge versions',
                  'Firefox ESR',
                ],
              },
              useBuiltIns: 'usage',
              modules: false,
              corejs: { version: 3, proposals: true },
            },
          ],
        ],
      }),
    resolve(),
    commonjs({ include: /node_modules/ }),
    isProd &&
      terser({
        output: {
          comments: function (node, comment) {
            var text = comment.value;
            var type = comment.type;
            if (type == 'comment2') {
              // multiline comment
              return /@preserve|@license|@cc_on/i.test(text);
            }
          },
        },
      }),
  ],
  watch: {
    clearScreen: false,
  },
};
