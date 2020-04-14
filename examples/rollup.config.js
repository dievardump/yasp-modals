import fs from 'fs';
import path from 'path';

import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

import directories from './examples.json';

const configs = [];

directories.forEach((example_dir) => {
  const dir_path = path.join(__dirname, example_dir);
  const main_path = path.join(dir_path, 'src', 'main.js');
  if (fs.existsSync(dir_path) && fs.existsSync(main_path)) {
    configs.push({
      input: main_path,
      output: {
        file: path.join(dir_path, 'bundle.js'),
      },
      plugins: [
        svelte(),
        resolve({
          mainFields: ['svelte', 'browser', 'module', 'main'],
          dedupe: [
            'svelte',
            'svelte/transition',
            'svelte/internal',
            'svelte/store',
          ],
        }),
        commonjs({ include: /node_modules/ }),
      ],
      watch: {
        clearScreen: false,
      },
    });
  }
});

export default configs;
