'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./modules/prompts');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.composeWith('one-base:gulp');
  },

  prompting: function () {
    // Greet the user
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('generator-one-base') + ' generator!'
    ));

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.destinationRoot(this.props.projectName);

    // General
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    // Styles
    this.fs.copy(
      this.templatePath('src/styles'),
      this.destinationPath('src/styles')
    );

    // Scripts
    this.fs.copy(
      this.templatePath('src/scripts'),
      this.destinationPath('src/scripts')
    );

    // Package.js
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.props.projectName,
        projectTitle: this.props.projectTitle,
        githubName: this.props.githubName,
        name: this.props.name,
        email: this.props.email,
        website: this.props.website
      }
    );

    // index.html
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        projectTitle: this.props.projectTitle
      }
    );
  },

  install: {
    installDependencies: function() {
      var dependencies = [
        'one-router',
        'one-sass-toolkit'
      ];

      var self = this;

      // Display a message
      this.log(chalk.yellow('\nInstalling dependencies via npm: '));

      // Install dependencies
      self.npmInstall(dependencies.concat(this.props.optionalDeps), { 'save': true });
    },

    craftSetup: function() {
      if (!this.props.isCraft) return;
      // Do Craft-related stuff here in the future…
    }
  },

  end: function() {
    this.log('\nAll done! Run ' + chalk.yellow('gulp') + ' to start your development server.');
  }
});
