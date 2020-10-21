import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import filesize from "rollup-plugin-filesize";

import pkg from "./package.json"

export default {
  input: `./src/index.ts`,
  output: [
    {
      file: pkg.main,
      format: 'cjs'
     },
     {
      file: pkg.module,
      format: 'es' // the preferred format
     },
     {
      file: pkg.browser,
      format: 'iife',
      name: 'organicLit'
     },
  ],
  plugins: [
    typescript(),
    replace({ "Reflect.decorate": "undefined" }),
    commonjs(),
    resolve(),
    terser({
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    filesize({
      showBrotliSize: true,
    }),
  ],
};
