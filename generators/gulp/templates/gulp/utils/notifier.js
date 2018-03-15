const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');

module.exports = function() {
  //
  //   Private Vars
  //
  //////////////////////////////////////////////////////////////////////

  const self = {
    dirPath: path.resolve('./tmp'),
    filePath: path.resolve('./tmp/errors.json'),
    defaultContents: { errors: [] },
    divider: '<br/>--------------------------------------------------------------------------------<br/>'
  };


  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  const _init = function() {
    if (typeof global.messageQueue === 'undefined') {
      global.messageQueue = [];
    }
  };


  //
  //   Public Methods
  //
  //////////////////////////////////////////////////////////////////////

  /**
   * Create a JSON file to contain errors (if it doesn't exist)
   */
  self.create = function() {
    if (!fs.existsSync(self.dirPath)) { fs.mkdirSync(self.dirPath); }
    const file = jsonfile.readFileSync(self.filePath, { throws: false });
    if (!file) { self.reset(); }
  };

  /**
   * Reset the contents of the JSON file
   */
  self.reset = function() {
    jsonfile.writeFileSync(self.filePath, self.defaultContents);
  };

  /**
   * Get all `errors` in the current JSON file
   * @return {array} All current error messages (returns null if empty)
   */
  self.get = function() {
    const file = jsonfile.readFileSync(self.filePath, { throws: false });
    if (file) { return file.errors; }
    return null;
  };

  /**
   * Get a pre-formatted list of all messages in the JSON file
   * @return {string} Formatted list of messages (null if empty)
   */
  self.getFormatted = function() {
    const messages = self.get();
    if (messages.length) {
      return messages.join(self.divider);
    }
    return null;
  };

  /**
   * Get a pre-formatted list of messages in the in-memory queue
   * @return {string} Formatted list of messages (null if empty)
   */
  self.getFormattedQueue = function() {
    if (global.messageQueue.length) {
      return global.messageQueue.join(self.divider);
    }
    return null;
  };

  /**
   * Add a message to the JSON file
   * @param {string} title The title or subject of the message
   * @param {string} msg   The body of the message
   */
  self.add = function(title, msg) {
    const file = self.get();
    if (!file) { self.create(); }
    const errors = self.get();
    errors.push((self.formatMessage(title, msg)));
    jsonfile.writeFileSync(self.filePath, { errors: errors });
  };

  /**
   * Applys consistent formatting to a message
   * @param  {string} title The title or subject of the message
   * @param  {string} msg   The body of the message
   * @return {string}       A nicely formatted version of the message
   */
  self.formatMessage = function(title, msg) {
    return [`<span>${title}</span>`, msg].join(' | ');
  };

  /**
   * Adds a message to the in-memory queue to be shown later
   * @param  {string} title The title or subject of the message
   * @param  {string} msg   The body of the message
   */
  self.queue = function(title, msg) {
    global.messageQueue.push(self.formatMessage(title, msg));
  };

  /**
   * Broadcasts all messages in the current queue and clears the queue
   * @param  {integer} duration The number of ms to show the message for
   */
  self.notify = function(duration) {
    if (!global.messageQueue.length) return;
    if (typeof duration === 'undefined') { duration = 50000; }
    global.browserSync.notify(self.getFormattedQueue(), duration);
    global.messageQueue = [];
  };


  //
  //   Initialize
  //
  //////////////////////////////////////////////////////////////////////

  _init();

  // Return the Object
  return self;
};
