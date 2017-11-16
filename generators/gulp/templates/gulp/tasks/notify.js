var config       = require('../config');
var gulp         = require('gulp');
var Notifier     = require('../utils/notifier')();

//
//   Notify
//
//////////////////////////////////////////////////////////////////////

/*
Broadcasts all queued notifications as in-browser messages
*/

module.exports = gulp.task('notify', function(callback) {
  Notifier.notify();
  callback();
});
