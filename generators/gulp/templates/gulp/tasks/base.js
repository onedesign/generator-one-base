const gulp = require('gulp');
const runSequence = require('run-sequence');

//
//   Base
//
//////////////////////////////////////////////////////////////////////

/*
The baseline tasks to get things going.
*/

module.exports = gulp.task('base', function(callback) {
  runSequence(
    'clean',
    'rev:clear',
    [
      'templates',<% if (useNunjucks) { %>
      'nunjucks',<% } %>
      'scripts:bundle',
      'scripts:lint',
      'styles',
      'styles:copy',
      'styles:lint',
      'scripts:copy'
    ],
    callback
  );
});
