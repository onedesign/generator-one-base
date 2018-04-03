'use strict';
const Generator = require('yeoman-generator');
const extend = require('deep-extend');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    const prompts = [
      {
        type: 'checkbox',
        name: 'deps',
        message: 'Which optional style dependencies do you want installed?',
        choices: [
          {
            name: 'Sass MQ',
            value: 'sass-mq',
            checked: true
          },
          {
            name: 'One Sass Toolkit',
            value: 'one-sass-toolkit',
            checked: true
          }
        ],
        default: []
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  writing() {
    this.log(chalk.green('Writing styles files...'));
    this.fs.copyTpl(
      this.templatePath('main.scss'),
      this.destinationPath('src/styles/main.scss'),
      {
        deps: this.props.deps
      }
    );

    this.fs.copyTpl(
      this.templatePath('base/*'),
      this.destinationPath('src/styles/base'),
      {
        deps: this.props.deps
      }
    );

    this.fs.copy(
      this.templatePath('util/*'),
      this.destinationPath('src/styles/util')
    );

    this.fs.copy(
      this.templatePath('vendor/*'),
      this.destinationPath('src/styles/vendor')
    );
  }

  install() {
    this.log(chalk.yellow('\nInstalling style-related dependencies…'));
    if (this.props.deps && this.props.deps.length) {
      this.yarnInstall(this.props.deps, { silent: true }).then(() => {
        this.log(chalk.green('Installed style-related depenencies.'));
      });
    }
  }
};
