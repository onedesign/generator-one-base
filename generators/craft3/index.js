'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const del = require('del');
const childProcess = require('child_process');
const prompts = require('./modules/prompts');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {
      craftPlugins: []
    };
  }

  initializing() {
    this.closingStatements = [];
  }

  prompting() {
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  configuring() {
    this.destinationRoot('./');
  }

  git() {
    this.composeWith(require.resolve('../git'));

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  writing() {
    // download craft
    childProcess.execSync(`composer create-project -s RC craftcms/craft ${this.props.projectName}-craft`);

    // move install since composer requires a directory name that isn't ./
    childProcess.execSync(`mv ${this.props.projectName}-craft/* ./`);
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
      this.destinationPath('.env.example')
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
      this.destinationPath('web/.htaccess'), {
        projectName: this.props.projectName
      }
    );

    this.fs.copyTpl(
      this.templatePath('env.sample'),
      this.destinationPath('env.sample'), {
        projectName: this.props.projectName,
        craftPlugins: this.props.craftPlugins
      }
    );

    this.fs.copyTpl(
      this.templatePath('env.sample'),
      this.destinationPath('.env'), {
        projectName: this.props.projectName,
        craftPlugins: this.props.craftPlugins
      }
    );

    //
    // Craft Templates
    //
    this.fs.copyTpl(
      this.templatePath('templates/'),
      this.destinationPath('templates/'), {
        craftPlugins: this.props.craftPlugins
      }
    );

    //
    // Overriding default configuration
    //
    del.sync([
      this.destinationPath('config/general.php'),
      this.destinationPath('config/db.php')
    ]);
    this.fs.copy(
      this.templatePath('config/general.php'),
      this.destinationPath('config/general.php')
    );
    this.fs.copy(
      this.templatePath('config/db.php'),
      this.destinationPath('config/db.php')
    );

    //
    // Asset Rev
    //
    if (this.props.craftPlugins.includes('clubstudioltd/craft-asset-rev') > -1) {
      this.fs.copy(
        this.templatePath('config/assetrev.php'),
        this.destinationPath('config/assetrev.php')
      );
    }

    //
    // Composer
    //
    del.sync([
      this.destinationPath('composer.json'),
      this.destinationPath('composer.lock')
    ]);
    this.fs.copyTpl(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json'), {
        plugins: this.props.craftPlugins
      }
    );
    this.closingStatements.push('Craft Plugins: ' + chalk.yellow('Your chosen plugins have been installed via Composer, but you’ll still need to install them in the Craft control panel at /admin/settings/plugins'));
  }

  install() {
    this.log(chalk.yellow('\nInstalling dependencies via composer: '));
    const pluginList = this.props.craftPlugins.join(' ');
    childProcess.execSync(`composer require ${pluginList}`);
  }

  end() {
    this.log('(be sure to create a ' + chalk.cyan(this.props.projectName) + ' database if you haven’t already)');

    const that = this;
    // Output all closing statements
    this.closingStatements.forEach(function(statement) {
      that.log('\n' + statement);
    });
  }
};
