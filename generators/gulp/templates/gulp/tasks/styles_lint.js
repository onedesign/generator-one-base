var config       = require('../config');
var gulp         = require('gulp');
var styleLint    = require('gulp-stylelint');
var Notifier     = require('../utils/notifier')();

//
//   Styles : Lint
//
//////////////////////////////////////////////////////////////////////

/*
Reviews files for errors and coding consistency
*/

var _resultNotifications = function(results) {
  results.forEach(function(result) {
    var msg = '<br/>' + result.source;
    result.warnings.forEach(function(warning) {
      msg += '<br/>';
      msg += [
        [warning.line, warning.column].join(':'),
        warning.text
      ].join('   ');
    });
    if (result.warnings.length) {
      Notifier.queue('styles:lint', msg);
    }
  });
};

module.exports = gulp.task('styles:lint', function() {
  return gulp
    .src([
      config.paths.styleSrc + '**/*.scss',
      '!' + config.paths.styleSrc + 'vendor/**/*.scss',
      '!' + config.paths.styleSrc + 'vendor-customization/**/*.scss'
    ])
    .pipe(styleLint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'string',
          console: true
        },
        {
          formatter: _resultNotifications
        }
      ]
    }));
});
