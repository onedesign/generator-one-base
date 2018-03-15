'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const fs = require('fs');

module.exports = class extends Generator {
  writing() {
    if (this.fs.exists(this.destinationPath('.gitignore'))) {
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
};
