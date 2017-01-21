var gulp         = require('gulp');
var runSequence  = require('run-sequence');

//
//   Build
//
//////////////////////////////////////////////////////////////////////

/*
Base tasks + tasks that should be run on production
*/

module.exports = gulp.task('build', function(callback) {
  runSequence(
    'base',
    'scripts:uglify',
    'rev',
    callback
  );
});
