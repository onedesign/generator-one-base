var gulp         = require('gulp');
var runSequence  = require('run-sequence');

//
//   Build
//
//////////////////////////////////////////////////////////////////////

/*
Runs all tasks needed to produce a deployable project
*/

module.exports = gulp.task('build', function(callback) {
  runSequence(
    'clean',
    [
      'styles',
      'scripts:lint',
      'scripts:bundle',
      'scripts:uglify',
      'templates',
      'images'
    ],
    callback
  );
});