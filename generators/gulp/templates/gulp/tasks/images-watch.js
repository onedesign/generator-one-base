var config       = require('../config');
var gulp         = require('gulp');

//
//   Images Watch
//
//////////////////////////////////////////////////////////////////////

/*
Reloads the browser after images have been processed
*/

module.exports = gulp.task('images:watch', function(done) {
  global.browserSync.reload();
  done();
});
