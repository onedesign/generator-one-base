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

    // Git
    if (this.options.gitInit) {
      this.fs.copyTpl(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore'), {
          platform: this.options.platform
        }
      );

      this.fs.copy(
        this.templatePath('.github'),
        this.destinationPath('.github')
      );
    }

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
    this.fs.copyTpl(
      this.templatePath('src/styles/main.scss'),
      this.destinationPath('src/styles/main.scss'), {
        deps: this.options.optionalDeps
      }
    );

    // Scripts
    this.fs.copyTpl(
      this.templatePath('src/scripts/main.js'),
      this.destinationPath('src/scripts/main.js'), {
        deps: this.options.optionalDeps
      }
    );
    if (this.options.optionalDeps.indexOf('one-router') > -1) {
      this.fs.copy(
        this.templatePath('src/scripts/modules/routes'),
        this.destinationPath('src/scripts/modules/routes')
      );
    }

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

    // README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectTitle: this.options.projectTitle,
        description: this.options.description
      }
    );
  },

  install: {
    installDependencies: function() {
      var dependencies = [

      ];

      var self = this;

      // Display a message
      this.log(chalk.yellow('\nInstalling dependencies via yarn: '));

      // Install dependencies
      self.yarnInstall(dependencies.concat(this.options.optionalDeps), { 'save': true });
    },

    craftSetup: function() {
      if (!this.options.platform == 'craft') return;
      // Do Craft-related stuff here in the future…
    },

    gitInit: function() {
      // If we don't want to use Git, bail out
      if (!this.options.gitInit) return;

      this.log(chalk.yellow('\nInitializing Git repo…'));
      this.spawnCommandSync('git', ['init']);

      // This won't work on windows
      this.log(chalk.yellow('\nConfiguring Git hooks…'));
      this.spawnCommandSync('cp', [
        this.templatePath('hooks/pre-commit'),
        this.destinationPath('.git/hooks/pre-commit')
      ]);
      this.spawnCommandSync('chmod', [
        '+x',
        this.destinationPath('.git/hooks/pre-commit')
      ]);
      this.log(chalk.green('\nGit hooks configured.'));
    }
  },

  end: function() {
    this.log('\nAll done! Run ' + chalk.yellow('gulp') + ' to start your development server.');
  }
});
