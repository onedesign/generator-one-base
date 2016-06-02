var config       = require('../config');
var gulp         = require('gulp');
var browserSync  = require('browser-sync');

//
//   Templates
//
//////////////////////////////////////////////////////////////////////

/*
Reloads the browser on changes to templates
*/

module.exports = gulp.task('templates', function() {
  return gulp.src([
    config.paths.templateSrc + '**/*.html',
    config.paths.templateSrc + '**/*.php'
  ])
  .pipe(browserSync.reload({ stream: true, once: true }));
});