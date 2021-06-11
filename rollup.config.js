import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/paginoid.js',
      format: 'cjs',
      exports: 'named'
    }
  ],
  plugins: [
    external(),
    postcss({
      extensions: ['.css'],
      minimize: true
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs()
  ],
  external: ['react', 'react-dom']
};