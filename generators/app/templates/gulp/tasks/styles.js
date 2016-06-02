var config       = require('../config');
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var cssGlobbing  = require('gulp-css-globbing');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssimport    = require('gulp-cssimport');
var pixrem       = require('gulp-pixrem');

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
  return gulp.src([
    config.paths.styleSrc + 'main.scss',
  ])
  .pipe(cssimport({
    matchPattern: '*.css'
  }))
  .pipe(cssGlobbing({
    extensions: ['.scss']
  }))
  .pipe(sass({
    outputStyle: 'compressed',
  }).on('error', sass.logError))
  .pipe(pixrem({ rootValue: '10px' }))
  .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
  .pipe(gulp.dest(config.paths.styleDist))
  .pipe(browserSync.reload({ stream: true }));
});
