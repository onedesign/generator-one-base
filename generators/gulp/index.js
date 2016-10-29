'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Greet the user
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('generator-one-base') + ' generator!'
    ));
  },

  writing: function () {
    // Maybe not the best, but works for now
    this.destinationRoot('./');

    // Gulp
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('gulp'),
      this.destinationPath('gulp')
    );
  },

  end: function() {
    this.log('All done! Enjoy your gulp setup!');
  }
});
