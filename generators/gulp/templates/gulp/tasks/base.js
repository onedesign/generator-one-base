var gulp         = require('gulp');
var runSequence  = require('run-sequence');

//
//   Base
//
//////////////////////////////////////////////////////////////////////

/*
The baseline tasks to get things going.
*/

module.exports = gulp.task('base', function(callback) {
  runSequence(
    'clean',
    [
      'templates',
      'scripts:lint',
      'scripts:bundle',
      'styles',
      'styles:copy',
      'scripts:copy',
      'images',
      'svg'
    ],
    'rev:clear',
    'rev',
    callback
  );
});
