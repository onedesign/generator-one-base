const config = require('../config');
const gulp = require('gulp');

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
    .pipe(global.browserSync.reload({ stream: true, once: true }));
});
