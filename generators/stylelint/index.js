'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  writing() {
    this.log(chalk.green('Writing stylelint files...'));

    this.fs.copy(
      this.templatePath('.stylelintrc'),
      this.destinationPath('.stylelintrc')
    );
  }

  install() {
    const devDependencies = [
      'stylelint',
      'stylelint-config-odc',
      'stylelint-scss'
    ];

    // Display a message
    this.log(chalk.green('\nInstalling stylelint-related dependencies…'));

    // Install dev dependencies
    this.yarnInstall(devDependencies, { 'dev': true, silent: true }).then(() => {
      this.log(chalk.green('Installed stylelint-related dependencies.'));
    });
  }
};
