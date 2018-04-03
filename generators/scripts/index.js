'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const dependencies = require('./prompts/dependencies');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    const prompts = [{
      type: 'checkbox',
      name: 'deps',
      message: 'Which script dependencies do you want installed?',
      choices: dependencies,
      default: []
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.log(chalk.green('Writing scripts files...'));
    const { deps = [] } = this.props;

    this.fs.copy(
      this.templatePath('modules/.gitkeep'),
      this.destinationPath('src/scripts/modules/.gitkeep')
    );

    if (deps.includes('one-router')) {
      this.fs.copy(
        this.templatePath('routes/*'),
        this.destinationPath('src/scripts/routes')
      );
    }

    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/scripts/main.js'),
      {
        deps
      }
    );
  }

  install() {
    if (this.props.deps && this.props.deps.length) {
      this.log(chalk.yellow('\nInstalling script-related dependencies…'));
      this.yarnInstall(this.props.deps, { silent: true }).then(() => {
        this.log(chalk.green('Installed script-related dependencies.'));
      });
    }
  }
};
