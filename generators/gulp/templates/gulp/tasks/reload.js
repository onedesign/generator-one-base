const gulp = require('gulp');

//
//   Reload Browser
//
//////////////////////////////////////////////////////////////////////

/*
A generic task to reload the browser when another task is complete
*/

module.exports = gulp.task('reload', function(done) {
  global.browserSync.reload();
  done();
});
