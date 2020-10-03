import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import filesize from "rollup-plugin-filesize";

export default {
  input: `./docs/index.ts`,
  output: {
    file: `docs/index.js`,
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    typescript({ }),
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