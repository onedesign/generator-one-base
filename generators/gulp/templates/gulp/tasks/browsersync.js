const config = require('../config');
const gulp = require('gulp');
const Notifier = require('../utils/notifier')();


//
//   BrowserSync
//
//////////////////////////////////////////////////////////////////////

/*
Refreses browser on file changes and syncs scroll/clicks between devices.
Your site will be available at http://localhost:3000
*/

module.exports = gulp.task('browserSync', function() {
  const options = {
    port: 3000,
    open: false,
    notify: {
      styles: [
        'display: none;',
        'padding: 9px 15px 9px;',
        'position: fixed;',
        'text-align: left;',
        'font-family: monospace;',
        'font-size: 14px;',
        'line-height: 1.5;',
        'white-space: pre;',
        'z-index: 9999;',
        'left: 0px;',
        'border-top-right-radius: 4px;',
        'bottom: 0px;',
        'color: rgb(74, 74, 74);',
        'background-color: rgb(20, 20, 20);',
        'color: rgb(255, 255, 255);'
      ]
    }
  };

  if (config.useProxy) {
    options.proxy = config.proxyUrl;
  } else {
    options.server = {
      baseDir: config.serverBaseDir
    };
  }

  // Initialize Browsersync
  global.browserSync.init(null, options);

  // Reset the initial notifications
  Notifier.create();

  // Show any outstanding errors when client is connected
  global.browserSync.emitter.on('client:connected', function() {
    const notifications = Notifier.getFormatted();
    global.browserSync.notify(notifications ? notifications : 'Connected!', notifications ? 50000 : 2000);
    Notifier.reset();
  });
});
