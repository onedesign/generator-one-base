'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  writing() {
    this.log(chalk.green('Writing eslint files...'));

    this.fs.copy(
      this.templatePath('.eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    );
  }

  install() {
    const devDependencies = [
      'eslint',
      'eslint-config-odc',
      'eslint-plugin-react', // dependency of eslint-config-odc
      'babel-eslint' // dependency of eslint-config-odc
    ];

    // Display a message
    this.log(chalk.green('\nInstalling dependencies via yarn: '));

    // Install dev dependencies
    this.yarnInstall(devDependencies, { 'dev': true });
  }
};
