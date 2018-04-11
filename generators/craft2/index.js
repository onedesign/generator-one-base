'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const download = require('download');
const del = require('del');
const fs = require('fs');
const childProcess = require('child_process');
const extend = require('lodash/extend');
const prompts = require('./modules/prompts');
const plugins = require('./modules/available-plugins');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  initializing() {
    this.closingStatements = [];
  }

  prompting() {
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('Craft 2') + ' generator!'
    ));

    return this.prompt(prompts).then(props => {
      this.props = extend(props, {
        authorName: 'One Design Company',
        authorEmail: 'dev@onedesigncompany.com',
        authorUrl: 'https://onedesigncompany.com',
        githubName: 'onedesign',
        composerPlugins: [],
        githubPlugins: []
      });

      const self = this;

      // Separate Github vs composer plugins
      this.props.craftPlugins.forEach(function(idx) {
        const plugin = plugins[idx];
        if (!plugin) {
          throw new Error(`Plugin "${idx}" is not in the list of available plugins.`);
        }
        plugin.key = idx;
        if (plugin.src.indexOf('http') == -1) {
          self.props.composerPlugins.push(plugin);
        } else {
          self.props.githubPlugins.push(plugin);
        }
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

  gulp() {
    // Currently only supports gulp for building
    this.composeWith(require.resolve('../gulp'), {
      rootDistPath: 'public/dist',
      templateSrc: 'craft/templates/',
      templateDist: 'craft/templates/',
      useProxy: true,
      serverBaseDir: './',
      useNunjucks: false
    });
  }

  /**
   * Downloads and unzips Craft
   */
  downloadCraft() {
    this.log(chalk.green('Downloading Craft...'));
    const self = this;
    const craftDownloadUrl = 'http://buildwithcraft.com/latest.zip?accept_license=yes';
    return download(craftDownloadUrl, this.destinationPath(), {
      extract: true
    })
      .then(() => true)
      .catch((err) => {
        self.log(chalk.red(err));
      });
  }

  /**
   * Downloads all plugins that can't be installed with composer
   */
  downloadGithubPlugins() {
    this.log(chalk.green('Downloading Github Plugins...'));
    const self = this;
    const installationPromises = [];
    self.props.githubPlugins.forEach(function(plugin) {
      const downloadUrl = plugin.src + 'archive/' + plugin.branch + '.zip';
      const downloadPromise = download(downloadUrl, self.destinationPath('craft/plugins/downloads'), {
        extract: true
      });
      installationPromises.push(downloadPromise);
    });

    return Promise.all(installationPromises)
      .then(() => true)
      .catch((err) => {
        self.log(chalk.red(err));
      });
  }

  writing() {
    this.log(chalk.green('Configuring Craft2...'));

    // Cleans up default Craft install
    del.sync([
      this.destinationPath('readme.txt'),
      this.destinationPath('public/index.php'),
      this.destinationPath('public/htaccess'),
      this.destinationPath('craft/config/general.php'),
      this.destinationPath('craft/config/db.php'),
      this.destinationPath('craft/templates/news'),
      this.destinationPath('craft/templates/_layout.html'),
      this.destinationPath('craft/templates/index.html'),
      this.destinationPath('craft/templates/404.html')
    ]);

    // If using SEOmatic, remove default robots.txt
    if (this.props.craftPlugins.includes('seomatic')) {
      del.sync([
        this.destinationPath('public/robots.txt')
      ]);
      this.closingStatements.push('robots.txt: ' + chalk.yellow('We removed the default robots.txt because you’re using SEOmatic. Be sure to add your custom robots.txt to the SEOmatic settings in Craft.'));
    }

    this.fs.copy(
      this.templatePath('public/index.php'),
      this.destinationPath('public/index.php')
    );
    this.fs.copyTpl(
      this.templatePath('public/htaccess'),
      this.destinationPath('public/.htaccess'),
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

    // General
    this.fs.copy(
      this.templatePath('craft/config/general.php'),
      this.destinationPath('craft/config/general.php')
    );

    // Database
    this.fs.copy(
      this.templatePath('craft/config/db.php'),
      this.destinationPath('craft/config/db.php')
    );

    // Asset Rev
    if (this.props.craftPlugins.includes('assetrev')) {
      this.fs.copy(
        this.templatePath('craft/config/assetrev.php'),
        this.destinationPath('craft/config/assetrev.php')
      );
    }

    // Imager
    if (this.props.craftPlugins.includes('imager')) {
      this.fs.copyTpl(
        this.templatePath('craft/config/imager.php'),
        this.destinationPath('craft/config/imager.php'),
        this.props
      );
      this.closingStatements.push('Imager: ' + chalk.yellow('If you’re planning on using AWS with Imager, be sure to uncomment the AWS-related lines in .env'));
    }

    if (this.props.craftPlugins.includes('environmentlabel')) {
      this.fs.copyTpl(
        this.templatePath('craft/config/environmentlabel.php'),
        this.destinationPath('craft/config/environmentlabel.php')
      );
    }

    // Craft templates
    this.fs.copy(
      this.templatePath('craft/templates/'),
      this.destinationPath('craft/templates/')
    );

    // Composer
    this.fs.copyTpl(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json')
    );

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

    // Moves plugins that were just downloaded
    const self = this;
    this.props.githubPlugins.forEach(function(plugin) {
      const pluginDirPath = self.destinationPath('craft/plugins/downloads/' + plugin.githubName + '-' + plugin.branch.replace(/^v/, '') + '/' + plugin.key);
      if (!fs.existsSync(pluginDirPath)) return;
      fs.renameSync(pluginDirPath, self.destinationPath('craft/plugins/' + plugin.key));
    });

    del.sync([
      this.destinationPath('craft/plugins/downloads/')
    ]);

    // Sets necessary permissions
    this.log(chalk.green('> Setting global permissions to 755 / 644'));
    childProcess.execSync(`chmod -R 755 ${this.destinationPath()}`);
    childProcess.execSync('find . -type f -exec chmod 644 {} \\;');

    this.log(chalk.green('> Setting permissions on craft/app to 775 / 644'));
    childProcess.execSync(`chmod -R 775 ${this.destinationPath('craft/app')}`);
    childProcess.execSync(`find ${this.destinationPath('craft/app')} -type f -exec chmod 664 {} \\;`);

    this.log(chalk.green('> Setting permissions on craft/config to 775 / 644'));
    childProcess.execSync(`chmod -R 775 ${this.destinationPath('craft/config')}`);
    childProcess.execSync(`find ${this.destinationPath('craft/config')} -type f -exec chmod 664 {} \\;`);

    this.log(chalk.green('> Setting permissions on craft/storage to 775 / 644'));
    childProcess.execSync(`chmod -R 775 ${this.destinationPath('craft/storage')}`);
    childProcess.execSync(`find ${this.destinationPath('craft/storage')} -type f -exec chmod 664 {} \\;`);
  }

  install() {
    this.log(chalk.green('\nInstalling dependencies via composer...'));
    this.spawnCommandSync('composer', [
      'require',
      '--no-progress',
      ...this.props.composerPlugins
    ]);
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
