var jsonfile    = require('jsonfile');
var fs          = require('fs');
var path        = require('path');

module.exports = function() {
  //
  //   Private Vars
  //
  //////////////////////////////////////////////////////////////////////

  var self = {
    dirPath: path.resolve('./tmp'),
    filePath: path.resolve('./tmp/errors.json'),
    defaultContents: { errors: [] }
  };


  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {

  };


  //
  //   Public Methods
  //
  //////////////////////////////////////////////////////////////////////

  self.create = function() {
    // Create the temporary directory if it doesn't already exist
    if (!fs.existsSync(self.dirPath)) { fs.mkdirSync(self.dirPath); }

    // Attempt to read an existing file
    var file = jsonfile.readFileSync(self.filePath, { throws: false });

    // If file not found, create it
    if (!file) { self.reset(); }
  };

  self.reset = function() {
    jsonfile.writeFileSync(self.filePath, self.defaultContents);
  };

  self.get = function() {
    // Attempt to read an existing file
    var file = jsonfile.readFileSync(self.filePath, { throws: false });
    if (file) { return file.errors; }
    return null;
  };

  self.getFormatted = function() {
    var messages = self.get();
    if (messages.length) {
      return messages.join('<br/>--------------------------------------------------------------------------------<br/>');
    }
    return null;
  };

  self.add = function(title, msg) {
    var file = self.get();
    if (!file) { self.create(); }
    var errors = self.get();
    errors.push([`<span>${title}</span>`, msg].join(' | '));
    jsonfile.writeFileSync(self.filePath, { errors: errors });
  };


  //
  //   Initialize
  //
  //////////////////////////////////////////////////////////////////////

  _init();

  // Return the Object
  return self;
};
