var config       = require('../config');
var gulp         = require('gulp');
var imagemin     = require('gulp-imagemin');
var changed      = require('gulp-changed');

//
//   Images
//
//////////////////////////////////////////////////////////////////////

/*
Lossless optimization of image files
*/

module.exports = gulp.task('images', function() {
  return gulp.src([
    config.paths.imageSrc + '**/*.{png,gif,jpg,svg}'
  ])
  .pipe(changed(config.paths.imageDist))
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
