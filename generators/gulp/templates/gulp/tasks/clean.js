const config = require('../config');
const gulp = require('gulp');
const del = require('del');

//
//   Clean
//
//////////////////////////////////////////////////////////////////////

/*
Clears all distribution directories
*/

module.exports = gulp.task('clean', function() {
  return del(config.paths.dist);
});
