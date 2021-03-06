var config       = require('../config');
var gulp         = require('gulp');
var eslint       = require('gulp-eslint');
var Notifier     = require('../utils/notifier')();

//
//   Scripts : Lint
//
//////////////////////////////////////////////////////////////////////

/*
Reviews files for errors and coding consistency
*/

var _resultNotifications = function(result) {
  if (!result.messages.length) return;
  var msg = '<br/>' + result.filePath;
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
    .pipe(eslint({
      configFile: './node_modules/eslint-config-odc/eslintrc.json',
      useEslintrc: false
    }))
    .pipe(eslint.result(_resultNotifications))
    .pipe(eslint.format());
});
