'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./modules/prompts');

module.exports = Generator.extend({
  initializing: function () {
    this.composeWith('one-base:gulp');
  },

  prompting: function () {
    // Greet the user
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('generator-one-base') + ' generator!'
    ));

    return this.prompt(prompts).then(function (options) {
      // To access options later use this.options.someAnswer;
      this.options = options;
    }.bind(this));
  },

  writing: function () {
    this.destinationRoot(this.options.projectName);

    // General
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    // Editorconfig
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
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
        projectName: this.options.projectName,
        projectTitle: this.options.projectTitle,
        description: this.options.description,
        githubName: this.options.githubName,
        name: this.options.name,
        email: this.options.email,
        website: this.options.website
      }
    );

    // index.html
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        projectTitle: this.options.projectTitle
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectTitle: this.options.projectTitle,
        description: this.options.description
      }
    )
  },

  install: {
    installDependencies: function() {
      var dependencies = [
        'one-router',
        'one-sass-toolkit'
      ];

      var self = this;

      // Display a message
      this.log(chalk.yellow('\nInstalling dependencies via yarn: '));

      // Install dependencies
      self.yarnInstall(dependencies.concat(this.options.optionalDeps), { 'save': true });
    },

    craftSetup: function() {
      if (!this.options.isCraft) return;
      // Do Craft-related stuff here in the future…
    }
  },

  end: function() {
    this.log('\nAll done! Run ' + chalk.yellow('gulp') + ' to start your development server.');
  }
});
