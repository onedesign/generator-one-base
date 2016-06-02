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

  install: function () {
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
      'gulp-cssimport',
      'gulp-eslint',
      'gulp-imagemin',
      'gulp-pixrem',
      'gulp-sass',
      'gulp-shell',
      'gulp-uglify',
      'gulp-util',
      'node-libs-browser',
      'require-dir',
      'run-sequence',
      'script-loader'
    ];

    var dependencies = [
      'one-router'
    ];

    var self = this;

    // Install dev dependencies
    devDependencies.forEach(function(item) {
      self.npmInstall([item], { 'saveDev': true });
    });

    // Install dependencies
    dependencies.forEach(function(item) {
      self.npmInstall([item], { 'save': true });
    });

    // Install optional dependencies
    this.props.optionalDeps.forEach(function(item) {
      self.npmInstall([item], { 'save': true });
    });

    this.installDependencies();
  },

  end: function() {
    this.log('All done! Run ' + chalk.yellow('gulp') + ' to start your development server.');
  }
});
