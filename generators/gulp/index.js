'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const prompts = require('./modules/prompts');

module.exports = class extends Generator {
  prompting() {
    return this.prompt(prompts(this.options)).then(function(options) {
      Object.assign(this.options, options);
    }.bind(this));
  }

  writing() {
    this.destinationRoot('./');

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('.stylelintrc'),
      this.destinationPath('.stylelintrc')
    );

    this.fs.copyTpl(
      this.templatePath('gulp/tasks'),
      this.destinationPath('gulp/tasks'), this.options, {}, {
        globOptions: {
          ignore: this.options.useNunjucks ? [] : ['**/nunjucks.js']
        }
      }
    );

    this.fs.copy(
      this.templatePath('gulp/utils'),
      this.destinationPath('gulp/utils')
    );

    this.fs.copyTpl(
      this.templatePath('gulp/config.ejs'),
      this.destinationPath('gulp/config.js'),
      this.options
    );

    if (this.options.useNunjucks) {
      if (this.fs.exists('index.html')) {
        this.log(chalk.yellow('\nindex.html already exists. Not generating sample index.html.'));
      } else {
        this.fs.copyTpl(
          this.templatePath('index.html'),
          this.destinationPath('index.html'),
          this.options
        );
      }
    }
  }

  install() {
    const devDependencies = [
      'webpack',
      'babel-core',
      'babel-eslint',
      'babel-loader',
      'babel-preset-env',
      'babel-preset-react',
      'browser-sync',
      'del',
      'dotenv',
      'eslint',
      'eslint-config-odc',
      'eslint-plugin-react',
      'gulp',
      'autoprefixer',
      'gulp-changed-in-place',
      'gulp-css-globbing',
      'gulp-eslint',
      'gulp-postcss',
      'gulp-imagemin',
      'gulp-pixrem',
      'gulp-replace',
      'gulp-rev',
      'gulp-sass',
      'gulp-shell',
      'gulp-stylelint',
      'stylelint',
      'stylelint-scss',
      'gulp-util',
      'jsonfile',
      'node-libs-browser',
      'postcss-import',
      'require-dir',
      'run-sequence',
      'script-loader',
      'strip-ansi'
    ];

    // Add nunjucks if desired
    if (this.options.includeNunjucks) {
      devDependencies.push('gulp-nunjucks-render');
    }

    const self = this;

    // Display a message
    this.log(chalk.yellow('\nInstalling gulp-related dependencies via yarn: '));

    // Install dev dependencies
    self.yarnInstall(devDependencies, { 'dev': true });
  }
};
