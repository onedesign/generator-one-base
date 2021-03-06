'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./modules/prompts');

module.exports = Generator.extend({
  initializing: function() {

  },

  prompting: function() {
    // Greet the user
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('generator-one-base') + ' generator!'
    ));

    return this.prompt(prompts).then(function(options) {
      // To access options later use this.options.someAnswer;
      this.options = options;

      // Use gulp
      this.options.isUsingGulp = true;

      // Compose with Craft 2 generator
      if (this.options.platform == 'craft2') {
        this.composeWith(require.resolve('../craft2'), {
          projectName: this.options.projectName
        });
      }

      // Compose with Craft 3 generator
      if (this.options.platform == 'craft3') {
        this.composeWith(require.resolve('../craft3'), {
          projectName: this.options.projectName
        });
      }

      // Compose with Gulp generator
      this.composeWith(require.resolve('../gulp'), {
        projectName: this.options.projectName,
        platform: this.options.platform
      });
    }.bind(this));
  },

  writing: {
    setRoot: function() {
      this.destinationRoot(this.options.projectName);
    },

    git: function() {
      if (this.options.gitInit) {
        this.fs.copyTpl(
          this.templatePath('.gitignore'),
          this.destinationPath('.gitignore'), {
            platform: this.options.platform
          }
        );

        this.fs.copy(
          this.templatePath('.github'),
          this.destinationPath('.github')
        );
      }
    },

    editorConfig: function() {
      this.fs.copy(
        this.templatePath('.editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    styles: function() {
      this.fs.copyTpl(
        this.templatePath('src/styles'),
        this.destinationPath('src/styles'), {
          deps: this.options.optionalDeps
        }
      );
    },

    scripts: function() {
      this.fs.copyTpl(
        this.templatePath('src/scripts/main.js'),
        this.destinationPath('src/scripts/main.js'), {
          deps: this.options.optionalDeps
        }
      );
      if (this.options.optionalDeps.indexOf('one-router') > -1) {
        this.fs.copy(
          this.templatePath('src/scripts/modules/routes'),
          this.destinationPath('src/scripts/modules/routes')
        );
      }
    },

    packageJson: function() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          projectName: this.options.projectName,
          projectTitle: this.options.projectTitle,
          description: this.options.description,
          githubName: this.options.githubName,
          name: this.options.name,
          email: this.options.email,
          website: this.options.website,
          isUsingGulp: this.options.isUsingGulp
        }
      );
    },

    env: function() {
      this.fs.copyTpl(
        this.templatePath('env.sample'),
        this.destinationPath('env.sample'),
        {
          projectName: this.options.projectName
        }
      );
      this.fs.copyTpl(
        this.templatePath('env.sample'),
        this.destinationPath('.env'), {
          projectName: this.options.projectName
        }
      );
    },

    readme: function() {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {
          projectName: this.options.projectName,
          projectTitle: this.options.projectTitle,
          description: this.options.description,
          platform: this.options.platform
        }
      );
    }
  },

  install: {
    installDependencies: function() {
      var dependencies = [

      ];

      var self = this;

      // Display a message
      this.log(chalk.yellow('\nInstalling dependencies via yarn: '));

      // Install dependencies
      self.yarnInstall(dependencies.concat(this.options.optionalDeps), { 'save': true });
    },

    craftSetup: function() {
      if (!this.options.platform == 'craft') return;
      // Do Craft-related stuff here in the future…
    },

    gitInit: function() {
      // If we don't want to use Git, bail out
      if (!this.options.gitInit) return;

      this.log(chalk.yellow('\nInitializing Git repo…'));
      this.spawnCommandSync('git', ['init']);

      // This won't work on windows
      this.log(chalk.yellow('\nConfiguring Git hooks…'));
      this.spawnCommandSync('cp', [
        this.templatePath('hooks/pre-commit'),
        this.destinationPath('.git/hooks/pre-commit')
      ]);
      this.spawnCommandSync('chmod', [
        '+x',
        this.destinationPath('.git/hooks/pre-commit')
      ]);
      this.log(chalk.green('\nGit hooks configured.'));
    }
  },

  end: function() {
    this.log('\nAll done! Run ' + chalk.yellow('cd ' + this.options.projectName) + ' and ' + chalk.yellow('yarn start') + ' to start your development server.');
  }
});
