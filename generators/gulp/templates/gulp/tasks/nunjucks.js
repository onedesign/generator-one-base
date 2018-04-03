const config = require('../config');
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');

//
//   nunjucks
//
//////////////////////////////////////////////////////////////////////

/*
Compiles templates using nunjucks
*/

module.exports = gulp.task('nunjucks', function() {
  return gulp.src([
    config.paths.templateSrc + '**/[^_]*.twig'
  ])
    .pipe(nunjucks({
      path: [config.paths.templateSrc],
      data: {
        cssPath: '/styles/',
        scriptPath: '/scripts/'
      }
    }))
    .pipe(gulp.dest(config.paths.templateDist))
    .pipe(global.browserSync.reload({ stream: true, once: true }));
});
