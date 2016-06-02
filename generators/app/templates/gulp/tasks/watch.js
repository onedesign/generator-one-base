var config       = require('../config');
var gulp         = require('gulp');

//
//   Watch
//
//////////////////////////////////////////////////////////////////////

/*
Runs tasks when files change
*/

module.exports = gulp.task('watch', function() {
  gulp.watch([config.paths.styleSrc + '**/*.scss'], ['styles']);
  gulp.watch([config.paths.scriptSrc + '**/*.js'], ['scripts:lint', 'scripts:bundle']);
  gulp.watch([config.paths.templateSrc + '**/*.html', config.paths.templateSrc + '**/*.php'], ['templates']);
  gulp.watch([config.paths.imageSrc + '**/*'], ['images']);
});