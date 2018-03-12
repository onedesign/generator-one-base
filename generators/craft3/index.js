'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const del = require('del');
const childProcess = require('child_process');
const prompts = require('./modules/prompts');

module.exports = class extends Generator {
  initializing() {
    this.closingStatements = [];
  }

  prompting() {
    return this.prompt(prompts).then(function(options) {
      Object.assign(this.options, options);
    }.bind(this));
  }

  writing() {

    (function setRoot() {
      this.destinationRoot('./');
    })();

    (function downloadCraft() {
      childProcess.execSync(`composer create-project -s RC craftcms/craft ${this.options.projectName}-craft`);
    })();

    (function move() {
      childProcess.execSync(`mv ${this.options.projectName}-craft/* ./`);
      del.sync([
        this.destinationPath(`${this.options.projectName}-craft`)
      ]);
    })();

    (function clean() {
      del.sync([
        this.destinationPath('LICENSE.md'),
        this.destinationPath('README.md'),
        this.destinationPath('craft.bat')
      ]);

      // If using SEOmatic, remove default robots.txt
      if (this.options.craftPlugins.indexOf('seomatic') > -1) {
        del.sync([
          this.destinationPath('web/robots.txt')
        ]);
        this.closingStatements.push('robots.txt: ' + chalk.yellow('We removed the default robots.txt because you’re using SEOmatic. Be sure to add your custom robots.txt to the SEOmatic settings in Craft.'));
      }
    })();

    (function publicFiles() {
      del.sync([
        this.destinationPath('web/.htaccess')
      ]);
      this.fs.copyTpl(
        this.templatePath('web/htaccess'),
        this.destinationPath('web/.htaccess'), {
          projectName: this.options.projectName
        }
      );
    })();

    (function env() {
      del.sync([
        this.destinationPath('.env'),
        this.destinationPath('.env.example')
      ]);
      this.fs.copyTpl(
        this.templatePath('env.sample'),
        this.destinationPath('env.sample'), {
          projectName: this.options.projectName,
          craftPlugins: this.options.craftPlugins
        }
      );
      this.fs.copyTpl(
        this.templatePath('env.sample'),
        this.destinationPath('.env'), {
          projectName: this.options.projectName,
          craftPlugins: this.options.craftPlugins
        }
      );
    })();

    (function templates() {
      this.fs.copy(
        this.templatePath('templates/_layout.html'),
        this.destinationPath('templates/_layout.html')
      );
      this.fs.copy(
        this.templatePath('templates/index.html'),
        this.destinationPath('templates/index.html')
      );
      this.fs.copy(
        this.templatePath('templates/404.html'),
        this.destinationPath('templates/404.html')
      );
      this.fs.copyTpl(
        this.templatePath('templates/_partials/head.html'),
        this.destinationPath('templates/_partials/head.html'), {
          craftPlugins: this.options.craftPlugins
        }
      );
    })();

    (function composer() {
      del.sync([
        this.destinationPath('composer.json'),
        this.destinationPath('composer.lock')
      ]);
      this.fs.copyTpl(
        this.templatePath('composer.json'),
        this.destinationPath('composer.json'), {
          plugins: this.options.craftPlugins
        }
      );
      this.closingStatements.push('Craft Plugins: ' + chalk.yellow('Your chosen plugins have been installed via Composer, but you’ll still need to install them in the Craft control panel at /admin/settings/plugins'));
    })();

    (function git() {
      this.composeWith(require.resolve('../git'));

      this.fs.copy(
        this.templatePath('templates/.gitignore'),
        this.destinationPath('templates/.gitignore')
      );
    })();
  }

  configuring() {
    del.sync([
      this.destinationPath('config/general.php'),
      this.destinationPath('config/db.php')
    ]);
    // General
    this.fs.copy(
      this.templatePath('config/general.php'),
      this.destinationPath('config/general.php')
    );

    // Database
    this.fs.copy(
      this.templatePath('config/db.php'),
      this.destinationPath('config/db.php')
    );

    // Asset Rev
    if (this.options.craftPlugins.indexOf('clubstudioltd/craft-asset-rev') > -1) {
      this.fs.copy(
        this.templatePath('config/assetrev.php'),
        this.destinationPath('config/assetrev.php')
      );
    }
  }

  install() {
    return {
      composer: function() {
        this.log(chalk.yellow('\nInstalling dependencies via composer: '));
        const pluginList = this.options.craftPlugins.join(' ');
        childProcess.execSync(`composer require ${pluginList}`);
      }
    };
  }

  end() {
    this.log('(be sure to create a ' + chalk.cyan(this.options.projectName) + ' database if you haven’t already)');

    const that = this;
    // Output all closing statements
    this.closingStatements.forEach(function(statement) {
      that.log('\n' + statement);
    });
  }
};
