'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const del = require('del');
const childProcess = require('child_process');
const prompts = require('./modules/prompts');
const fs = require('fs');
const extend = require('lodash/extend');
const guid = require('guid');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {
      craftPlugins: []
    };
  }

  initializing() {
    this.closingStatements = [];

    try {
      childProcess.execSync('composer --version');
    } catch (e) {
      this.log(chalk.red('Composer is not installed. You must install it to use this generator. See https://getcomposer.org/download/.'));
      process.exit(1);
    }
  }

  prompting() {
    return this.prompt(prompts).then(props => {
      this.props = extend(props, {
        authorName: 'One Design Company',
        authorEmail: 'dev@onedesigncompany',
        authorUrl: 'https://onedesigncompany.com',
        githubName: 'onedesign',

        // Generates a random security key to be used in .env
        securityKey: guid.raw()
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
    // Currently only supports gulp for building
    this.composeWith(require.resolve('../gulp'), {
      rootDistPath: 'web/dist',
      templateSrc: 'templates/',
      templateDist: 'templates/',
      useProxy: true,
      serverBaseDir: './'
    });
  }

  writing() {
    this.log(chalk.yellow('Installing Craft...'));

    // download craft
    childProcess.execSync(`composer create-project -s RC craftcms/craft ${this.props.projectName}-craft`);

    // move install to this dir since composer requires installing to a sub directory
    childProcess.execSync(`mv ${this.props.projectName}-craft/* ${this.destinationRoot()}`);
    del.sync([
      this.destinationPath(`${this.props.projectName}-craft`)
    ]);

    // Clean the default Craft install
    del.sync([
      this.destinationPath('LICENSE.md'),
      this.destinationPath('README.md'),
      this.destinationPath('craft.bat'),
      this.destinationPath('web/.htaccess'),
      this.destinationPath('.env'),
      this.destinationPath('.env.example'),
      this.destinationPath('config/general.php'),
      this.destinationPath('config/db.php'),
      this.destinationPath('composer.json'),
      this.destinationPath('composer.lock')
    ]);

    // If using SEOmatic, remove default robots.txt
    if (this.props.craftPlugins.includes('seomatic') > -1) {
      del.sync([
        this.destinationPath('web/robots.txt')
      ]);
      this.closingStatements.push('robots.txt: ' + chalk.yellow('We removed the default robots.txt because you’re using SEOmatic. Be sure to add your custom robots.txt to the SEOmatic settings in Craft.'));
    }

    this.fs.copyTpl(
      this.templatePath('web/htaccess'),
      this.destinationPath('web/.htaccess'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('env.sample'),
      this.destinationPath('env.sample'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('env.sample'),
      this.destinationPath('.env'),
      this.props
    );

    this.fs.copy(
      this.templatePath('config/general.php'),
      this.destinationPath('config/general.php')
    );

    this.fs.copy(
      this.templatePath('config/db.php'),
      this.destinationPath('config/db.php')
    );

    // Craft Templates
    this.fs.copyTpl(
      this.templatePath('templates/'),
      this.destinationPath('templates/'),
      this.props
    );

    // Asset Rev
    if (this.props.craftPlugins.includes('clubstudioltd/craft-asset-rev') > -1) {
      this.fs.copy(
        this.templatePath('config/assetrev.php'),
        this.destinationPath('config/assetrev.php')
      );
    }

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

    // Composer
    this.fs.copyTpl(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json')
    );
  }

  install() {
    this.log(chalk.yellow('\nInstalling dependencies via composer: '));
    const pluginList = this.props.craftPlugins.join(' ');
    childProcess.execSync(`composer require ${pluginList}`);
    this.closingStatements.push('Craft Plugins: ' + chalk.yellow('Your chosen plugins have been installed via Composer, but you’ll still need to install them in the Craft control panel at /admin/settings/plugins'));
  }

  end() {
    this.log("\n\n\n");
    this.log(chalk.green('==============================='));
    this.log(chalk.green('====== Install Notes =========='));
    this.log(chalk.green('==============================='));
    this.log(`Database: Create a MySQL database named '${chalk.cyan(this.props.projectName)}' if you haven’t already.`);

    const that = this;
    // Output all closing statements
    this.closingStatements.forEach(function(statement) {
      that.log('\n' + statement);
    });
  }
};
