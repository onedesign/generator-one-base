const config = require('../config');
const gulp = require('gulp');

//
//   Scripts: Copy
//
//////////////////////////////////////////////////////////////////////

/*
Copies script files from src to dist
*/

module.exports = gulp.task('scripts:copy', function() {
  const scriptSrc = [];

  config.paths.scriptCopyPaths.forEach(function(path) {
    scriptSrc.push(config.paths.scriptSrc + path + '**/*.js');
  });

  return gulp.src(scriptSrc)
    .pipe(gulp.dest(config.paths.scriptDist));
});
