'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./modules/prompts');

module.exports = yeoman.Base.extend({
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
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('gulp'),
      this.destinationPath('gulp')
    );
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
      var devDependencies = [
        'webpack',
        'babel-core',
        'babel-eslint',
        'babel-loader',
        'babel-preset-es2015',
        'babel-preset-react',
        'babel-preset-stage-2',
        'browser-sync',
        'del',
        'eslint',
        'eslint-config-odc',
        'eslint-plugin-react',
        'gulp',
        'gulp-autoprefixer',
        'gulp-css-globbing',
        'gulp-eslint',
        'gulp-postcss',
        'gulp-imagemin',
        'gulp-pixrem',
        'gulp-rev',
        'gulp-sass',
        'gulp-shell',
        'gulp-uglify',
        'gulp-util',
        'node-libs-browser',
        'postcss-import',
        'require-dir',
        'run-sequence',
        'script-loader'
      ];

      var dependencies = [
        'one-router',
        'one-sass-toolkit'
      ];

      var self = this;

      // Install dev dependencies
      devDependencies.forEach(function(item) {
        self.npmInstall([item], { 'saveDev': true });
      });

      // Explain that this is going to take awhile
      this.log(chalk.yellow('\nInstalling dependencies via npm: ') + ' You may want to go grab a cup of coffee. This could take awhile.\n');

      // Install dependencies
      dependencies.forEach(function(item) {
        self.npmInstall([item], { 'save': true });
      });

      // Install optional dependencies
      this.props.optionalDeps.forEach(function(item) {
        self.npmInstall([item], { 'save': true });
      });
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
