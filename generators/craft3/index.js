'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const del = require('del');
const childProcess = require('child_process');
const yosay = require('yosay');
const prompts = require('./modules/prompts');
const fs = require('fs');
const extend = require('lodash/extend');
const guid = require('guid');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  initializing() {
    this.closingStatements = [];
    this.props = {
      craftPlugins: []
    };

    try {
      childProcess.execSync('composer --version');
    } catch (e) {
      this.log(chalk.red('Composer is not installed. You must install it to use this generator. See https://getcomposer.org/download/.'));
      process.exit(1);
    }
  }

  prompting() {
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('Craft 3') + ' generator!'
    ));

    return this.prompt(prompts).then(props => {
      this.props = extend(props, {
        authorName: 'One Design Company',
        authorEmail: 'dev@onedesigncompany.com',
        authorUrl: 'https://onedesigncompany.com',
        githubName: 'onedesign',

        // Generates a random security key to be used in .env
        securityKey: guid.raw()
      });

      // To access props use this.props.someAnswer;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      const text = `\nYour project should be inside a folder named ${chalk.red(this.props.projectName)}\nI'll automatically create this folder.\n\n(If you meant to run this generator inside of an existing project directory, make sure that the ${chalk.red('Project Name')} you enter at the prompt matches the name of your current directory.)\n`;
      this.log(chalk.yellow(text));
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
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
      serverBaseDir: './',
      useNunjucks: false
    });
  }

  writing() {
    this.log(chalk.yellow('Installing Craft...'));

    // download craft
    childProcess.execSync(`composer create-project craftcms/craft ${this.props.projectName}-craft`);

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
      this.destinationPath('composer.lock'),
      this.destinationPath('package.json'),
      this.destinationPath('templates')
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
    if (this.props.craftPlugins.includes('clubstudioltd/craft-asset-rev')) {
      this.fs.copy(
        this.templatePath('config/assetrev.php'),
        this.destinationPath('config/assetrev.php')
      );
    }

    // Environment Label
    if (this.props.craftPlugins.includes('topshelfcraft/environment-label')) {
      this.fs.copy(
        this.templatePath('config/environment-label.php'),
        this.destinationPath('config/environment-label.php')
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
    this.log(chalk.yellow('\nInstalling dependencies via composer…'));
    const pluginList = this.props.craftPlugins.join(' ');
    childProcess.execSync(`composer require --no-progress ${pluginList}`);
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
