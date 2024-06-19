import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default {
    input: './index.js',
    output: [
        {
            file: 'bundle.js',
            format: 'cjs',
            exports: 'default',
            globals: {
                winston: 'winston'
              }
        }
    ],
    external: ['winston'],
    plugins: [
        resolve(),
        commonjs(),
        terser(),
        json()
    ]
};