'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const packagePrompts = require('./prompts/package');
const build = require('./prompts/build');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const _isArray = require('lodash/isArray');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {};

    this.option('skip-install');
    this.option('odc');

    this.testMode = false;

    this.skipInstall = this.options['skip-install'];
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the legendary ' + chalk.red('generator-one-base') + ' generator!')
    );

    // I don't love this syntax, but it works pretty well.
    const prompts = [
      ...packagePrompts.base,
      ...!this.options.odc ? packagePrompts.author : [],
      ...build.whichProcess
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      if (this.options.odc) {
        this.props = extend(props, {
          authorName: 'One Design Company',
          authorEmail: 'dev@onedesigncompany',
          authorUrl: 'https://onedesigncompany.com'
        });
      } else {
        this.props = props;
      }
    });
  }

  configuring() {}

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.log(`Creating package.json file ...`);

    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const dependencies = [];
    const devDependencies = [
      'eslint',
      'eslint-config-odc',
      'eslint-plugin-react',
      'babel-eslint',
      'husky'
    ];
    const scripts = {
      precommit: 'lint-staged'
    };

    const usingBlendid = this.props.buildProcess === 'blendid';

    if (usingBlendid) {
      dependencies.push(
        'blendid',
        'dotenv'
      );

      scripts.start = 'blendid';
      scripts.build = 'NODE_ENV=production blendid build';
    } else {
      // Add our ODC dependencies
    }

    extend(pkg, {
      name: this.props.name,
      description: this.props.description,
      scripts,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      engines: {
        node: '>=6.11.1',
        npm: '>=3.10.3'
      },
      eslintConfig: {
        extends: ['odc']
      },
      license: this.options.odc ? 'proprietary' : 'MIT',
      "lint-staged": {
        "*.js": ["eslint --fix", "git add"]
      }
    });

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.yarnInstall(dependencies, { silent: true }).then(() => {
      this.log(chalk.green('Successfully installed dependencies.'));
    });

    this.yarnInstall(devDependencies, { dev: true, silent: true }).then(() => {
      this.log(chalk.green('Success! Installed dev dependencies.'));
    });

    this.log('Creating dotfiles ...');

    const dotfiles = [
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      ['env.sample', 'env.sample', { name: this.props.name }],
      ['env.sample', '.env', { name: this.props.name }]
    ];

    dotfiles.map((filename) => {
      if (_isArray(filename)) {
        if (filename.length === 2) {
          this.fs.copy(
            this.templatePath(`dotfiles/${filename[0]}`),
            this.destinationPath(filename[1])
          );
        } else if (filename.length === 3) {
          this.fs.copyTpl(
            this.templatePath(`dotfiles/${filename[0]}`),
            this.destinationPath(filename[1]),
            filename[2]
          );
        }
      } else {
        this.fs.copy(
          this.templatePath(`dotfiles/${filename}`),
          this.destinationPath(filename)
        );
      }
    });

    this.log('Creating README ...');

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        title: this.props.title,
        description: this.props.description
      }
    );
  }

  install() {}

  end() {
    this.log('Thanks!');
  }
};
