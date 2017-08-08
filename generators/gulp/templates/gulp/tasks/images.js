var config          = require('../config');
var gulp            = require('gulp');
var imagemin        = require('gulp-imagemin');
var changedInPlace  = require('gulp-changed-in-place');

//
//   Images
//
//////////////////////////////////////////////////////////////////////

/*
Lossless optimization of image files
*/

module.exports = gulp.task('images', function() {
  return gulp.src([
    config.paths.imageSrc + '**/*'
  ])
  .pipe(changedInPlace({ firstPass: true }))
  .pipe(imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo({
        plugins: [
          { cleanupIDs: false },
          { collapseGroups: false },
          { mergePaths: false },
          { moveElemsAttrsToGroup: false },
          { moveGroupAttrsToElems: false },
          { removeUselessStrokeAndFill: false },
          { removeViewBox: false }
        ]
      }),
      imagemin.gifsicle(),
      imagemin.optipng()
    ]
  ))
  .pipe(gulp.dest(config.paths.imageDist));
});
