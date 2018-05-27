'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const prompts = require('./modules/prompts');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    return this.prompt(prompts(this.options)).then(function(options) {
      Object.assign(this.options, options);
    }.bind(this));
  }

  eslint() {
    this.composeWith(require.resolve('../eslint'));
  }

  stylelint() {
    this.composeWith(require.resolve('../stylelint'));
  }

  writing() {
    this.log(chalk.green('Writing gulp files...'));

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copyTpl(
      this.templatePath('gulp/tasks'),
      this.destinationPath('gulp/tasks'), this.options, {}, {
        globOptions: {
          ignore: this.options.useNunjucks ? [] : ['**/nunjucks.js']
        }
      }
    );

    if (this.fs.exists('.gitignore')) {
      this.fs.append(
        this.destinationPath('.gitignore'),
        fs.readFileSync(this.templatePath('.gitignore'))
      );
    } else {
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
    }

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
      this.fs.copyTpl(
        this.templatePath('templates'),
        this.destinationPath('src/templates'),
        this.options
      );
    }
  }

  install() {
    const devDependencies = [
      'autoprefixer',
      'babel-core',
      'babel-loader',
      'babel-preset-env',
      'babel-preset-react',
      'browser-sync',
      'del',
      'dotenv',
      'eslint-loader',
      'gulp-changed-in-place',
      'gulp-css-globbing',
      'gulp-eslint',
      'gulp-imagemin',
      'gulp-pixrem',
      'gulp-postcss',
      'gulp-replace',
      'gulp-rev',
      'gulp-sass',
      'gulp-shell',
      'gulp-stylelint',
      'gulp-util',
      'gulp',
      'jsonfile',
      'node-libs-browser',
      'postcss-import',
      'require-dir',
      'react-dev-utils',
      'run-sequence',
      'script-loader',
      'strip-ansi',
      'webpack'
    ];

    // Add nunjucks if desired
    if (this.options.useNunjucks) {
      devDependencies.push('gulp-nunjucks-render');
    }

    // Display a message
    this.log(chalk.yellow('\nInstalling gulp-related dependencies…'));

    // Install dev dependencies
    this.yarnInstall(devDependencies, { 'dev': true, silent: true }).then(() => {
      this.log(chalk.green('Installed gulp-related dependencies.'));
    });
  }
};
