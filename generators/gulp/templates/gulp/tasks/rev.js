const config = require('../config');
const gulp = require('gulp');
const del = require('del');
const rev = require('gulp-rev');
const replace = require('gulp-replace');

//
//   Rev
//
//////////////////////////////////////////////////////////////////////

/*
Adds revision hash to assets and stores hashes in a manifest file
*/

gulp.task('rev', function() {
  return gulp.src([
    config.paths.styleDist + '**/*.css',
    config.paths.scriptDist + '**/*.js'
  ], { base: "./" })
    .pipe(rev())
    .pipe(gulp.dest('.'))
    .pipe(rev.manifest())
    .pipe(replace('web/dist/', ''))
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('rev:clear', function() {
  return del([config.paths.dist + 'rev-manifest.json']);
});
