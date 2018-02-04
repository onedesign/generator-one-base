'use strict';
const Generator = require('yeoman-generator');
const extend = require('deep-extend');
const chalk = require('chalk');
const config = require('./config');
const os = require('os');

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
          },
          {
            name: 'Susy',
            value: 'susy',
            checked: false
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('main.scss'),
      this.destinationPath('src/styles/main.scss')
    );

    this.fs.copy(
      this.templatePath('base/*'),
      this.destinationPath('src/styles/base')
    );

    this.fs.copy(
      this.templatePath('util/*'),
      this.destinationPath('src/styles/util')
    );

    this.fs.copy(
      this.templatePath('vendor/*'),
      this.destinationPath('src/styles/vendor')
    );

    // inject variables
    if (this.props.deps && this.props.deps.length) {
      this.props.deps.map(dep => {
        if (config[dep]) {
          this.fs.append(
            this.destinationPath('src/styles/base/_variables.scss'),
            config[dep],
            {
              separator: `${os.EOL}${os.EOL}`
            }
          );
        }
      });
    }
  }

  install() {
    if (this.props.deps && this.props.deps.length) {
      this.yarnInstall(this.props.deps, { silent: true }).then(() => {
        this.log(chalk.green('Installed style depenencies.'));
      });
    }
  }
};
