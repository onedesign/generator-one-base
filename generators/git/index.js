'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const os = require('os');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('platform', {
      type: String,
      required: false,
      default: '',
      desc: 'Which platform are you using?'
    });
  }

  initializing() {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  writing() {
    const appendOptions = {
      separator: `${os.EOL}${os.EOL}`
    };

    const ignorePaths = {
      'craft3': this.templatePath('craft2.gitignore'),
      'craft2': this.templatePath('craft3.gitignore')
    };

    if (Object.keys(ignorePaths).includes(this.options.platform)) {
      const ignoreFile = this.destinationPath('.gitignore');
      const ignorePath = ignorePaths[this.options.platform];
      const content = this.fs.read(ignorePath);

      this.fs.append(ignoreFile, content, appendOptions);
    }
    this.log(chalk.green(`Created .gitignore.`));

    this.spawnCommandSync('git', ['init', '--quiet']);
    this.log(chalk.green('Initialized git repo.'));

    this.fs.copy(
      this.templatePath('.github'),
      this.destinationPath('.github')
    );
    this.log(chalk.green(`Created .github folder.`));

    this.spawnCommandSync('cp', [
      this.templatePath('hooks/pre-commit'),
      this.destinationPath('.git/hooks/pre-commit')
    ]);
    this.log(chalk.green('Configured git hooks.'));

    this.spawnCommandSync('chmod', [
      '+x',
      this.destinationPath('.git/hooks/pre-commit')
    ]);
    this.log(chalk.green('Git hooks configured.'));
  }

  end() {
  }
};
