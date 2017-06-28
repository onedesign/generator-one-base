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
    'rev:clear',
    [
      'templates',
      'scripts:lint',
      'scripts:bundle',
      'styles',
      'styles:copy',
      'scripts:copy',
      'images'
    ],
    callback
  );
});
