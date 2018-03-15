'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const prompts = require('./modules/prompts');
const fs = require('fs');
const extend = require('lodash/extend');

module.exports = class extends Generator {
  initializing() {
    this.closingStatements = [];
  }

  prompting() {
    return this.prompt(prompts).then(props => {
      this.props = extend(props, {
        authorName: 'One Design Company',
        authorEmail: 'dev@onedesigncompany',
        authorUrl: 'https://onedesigncompany.com',
        githubName: 'onedesign'
      });

      // To access props use this.props.someAnswer;
    });
  }

  git() {
    this.composeWith(require.resolve('../git'));
  }

  styles() {
    this.composeWith(require.resolve('../styles'));
  }

  scripts() {
    this.composeWith(require.resolve('../scripts'));
  }

  build() {
    let gulpOptions = {};

    if (this.props.useNunjucks) {
      gulpOptions = {
        useNunjucks: true,
        rootDistPath: 'dist',
        templateSrc: 'src/templates/',
        templateDist: 'dist/',
        serverBaseDir: 'dist/',
        useProxy: false
      };
    } else {
      gulpOptions = {
        useNunjucks: false,
        rootDistPath: 'dist',
        templateSrc: './',
        templateDist: './',
        serverBaseDir: './',
        useProxy: false
      };
    }

    // Currently only supports gulp for building
    this.composeWith(require.resolve('../gulp'), gulpOptions);
  }

  writing() {
    this.log(chalk.green('Generating static app files...'));

    // Git
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

    // Package
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    // README
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    );

    // Editor
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }
};
