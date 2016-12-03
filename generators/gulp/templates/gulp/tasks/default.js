var gulp         = require('gulp');
var runSequence  = require('run-sequence');

//
//   Default
//
//////////////////////////////////////////////////////////////////////

/*
Base tasks + local development tasks
*/

module.exports = gulp.task('default', function(callback) {
  runSequence(
    'base',
    [
      'browserSync',
      'watch'
    ],
    callback
  );
});
