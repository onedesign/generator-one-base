var config       = require('../config');
var gulp         = require('gulp');
var runSequence  = require('run-sequence');

//
//   Watch
//
//////////////////////////////////////////////////////////////////////

/*
Runs tasks when files change
*/

module.exports = gulp.task('watch', function() {
  gulp.watch([config.paths.styleSrc + '**/*.scss'], function() { runSequence('styles', 'rev:clear', 'styles:lint') });
  gulp.watch([config.paths.scriptSrc + '**/*.js'], function() { runSequence(['scripts:lint', 'scripts:bundle', 'scripts:copy'], 'rev:clear') });
  gulp.watch([config.paths.templateSrc + '**/*.html', config.paths.templateSrc + '**/*.php'], function() { runSequence('templates') });
  gulp.watch([config.paths.imageSrc + '**/*'], function() { runSequence('images', 'reload') });
});
