var gulp         = require('gulp');
var runSequence  = require('run-sequence');
global.browserSync = require('browser-sync').create();

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
      'watch',
      'images'
    ],
    callback
  );
});
