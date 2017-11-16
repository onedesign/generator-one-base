var config       = require('../config');
var gulp         = require('gulp');
var cssGlobbing  = require('gulp-css-globbing');
var sass         = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var pixrem       = require('gulp-pixrem');
var postcss      = require('gulp-postcss');
var importCss    = require('postcss-import');
var Notifier     = require('../utils/notifier')();

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
  var postCssProcessors = [
    importCss(),
    autoprefixer({ browsers: ['last 2 versions'] })
  ];

  return gulp.src([
    config.paths.styleSrc + 'main.scss'
  ])
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(sass({
      outputStyle: 'compressed',
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
