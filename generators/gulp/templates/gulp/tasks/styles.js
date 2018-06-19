const config = require('../config');
const gulp = require('gulp');
const cssGlobbing = require('gulp-css-globbing');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const pixrem = require('gulp-pixrem');
const postcss = require('gulp-postcss');
const importCss = require('postcss-import');
const cssnano = require('cssnano');
const Notifier = require('../utils/notifier')();

//
//   Styles
//
//////////////////////////////////////////////////////////////////////

/*
Preprocesses stylesheets using the following plugins:

sass: Sass compilation using super-fast libsass
cssGlobbing: Allows globbing imports in .scss: @import 'styles/modules/*.scss';
cssimport: Allows us to @import .css files in our .scss
pixrem: adds px fallback for all rem values
autoprefixer: Automatically adds vendor prefixes to experimental properties
*/

module.exports = gulp.task('styles', function() {
  const postCssProcessors = [
    importCss(),
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano()
  ];

  return gulp.src([
    config.paths.styleSrc + 'main.scss'
  ])
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(sass({
      outputStyle: 'nested',
      includePaths: ['./node_modules']
    }).on('error', function(error) {
      Notifier.queue('styles', error.message);
      sass.logError.call(this, error);
    }))
    .pipe(postcss(postCssProcessors, {}))
    .pipe(pixrem({ rootValue: '10px' }))
    .pipe(gulp.dest(config.paths.styleDist))
    .pipe(global.browserSync.reload({ stream: true }));
});
