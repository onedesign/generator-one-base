const config = require('../config');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const Notifier = require('../utils/notifier')();

//
//   Scripts : Lint
//
//////////////////////////////////////////////////////////////////////

/*
Reviews files for errors and coding consistency
*/

const _resultNotifications = function(result) {
  if (!result.messages.length) return;
  let msg = '<br/>' + result.filePath;
  result.messages.forEach(function(resultMessage) {
    if (resultMessage.severity == 1) return;
    msg += '<br/>';
    msg += [
      [resultMessage.line, resultMessage.column].join(':'),
      resultMessage.source.trim(),
      resultMessage.message
    ].join('   ');
  });
  Notifier.add('scripts:lint', msg);
};

module.exports = gulp.task('scripts:lint', function() {
  return gulp.src([
    config.paths.scriptSrc + '**/*.js',
    '!' + config.paths.scriptSrc + 'vendor/**/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.result(_resultNotifications))
    .pipe(eslint.format());
});
