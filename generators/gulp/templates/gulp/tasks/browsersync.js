var config      = require('../config');
var gulp        = require('gulp');

//
//   BrowserSync
//
//////////////////////////////////////////////////////////////////////

/*
Refreses browser on file changes and syncs scroll/clicks between devices.
Your site will be available at http://localhost:3000
*/

module.exports = gulp.task('browserSync', function() {
  var options = {
    port: 3000,
    open: false,
    notify: false
  }

  if (config.useProxy) {
    options.proxy = config.proxyUrl
  } else {
    options.server = {
      baseDir: './'
    }
  }

  global.browserSync.init(null, options);
});