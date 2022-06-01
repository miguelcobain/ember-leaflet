import babel from '@rollup/plugin-babel';
import { Addon } from '@embroider/addon-dev/rollup';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist'
});

export default {
  output: addon.output(),
  plugins: [
    addon.publicEntrypoints(['components/**/*.js', 'services/**/*.js', 'helpers/**/*.js', 'initializers/**/*.js']),
    addon.appReexports(['components/**/*.js', 'services/**/*.js', 'helpers/**/*.js', 'initializers/**/*.js']),
    babel({ babelHelpers: 'bundled' }),
    addon.hbs(),
    addon.keepAssets(['**/*.css']),
    addon.clean()
  ]
};
