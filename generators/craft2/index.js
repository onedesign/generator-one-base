'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
// const yosay = require('yosay');
const download = require('download');
const del = require('del');
const fs = require('fs');
const PleasantProgress = require('pleasant-progress');
const progress = new PleasantProgress();
const childProcess = require('child_process');
const prompts = require('./modules/prompts');
const plugins = require('./modules/craft_plugins');

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

  configuring() {
    this.destinationRoot('./');
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
      rootDistPath: 'public/dist',
      templateSrc: 'craft/templates/',
      templateDist: 'craft/templates/',
      useProxy: true,
      serverBaseDir: './'
    });
  }

  writing() {
    // TODO: await
    (function downloadCraft() {
      const craftDownloadUrl = 'http://buildwithcraft.com/latest.zip?accept_license=yes';
      progress.start('Installing Craft');
      return download(craftDownloadUrl, this.destinationPath(), {
        extract: true
      }).then(function() {
        progress.stop();
      });
    }).bind(this)();

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

    // Copy config
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
        this.destinationPath('craft/config/imager.php'), {
          projectName: this.props.projectName
        }
      );
      this.closingStatements.push('Imager: ' + chalk.yellow('If you’re planning on using AWS with Imager, be sure to uncomment the AWS-related lines in .env'));
    }

    if (this.props.craftPlugins.indexOf('environmentlabel') > -1) {
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

    // TODO: await
    (function downloadPlugins() {
      progress.start('Installing Craft Plugins');
      const installationPromises = [];
      const composerPlugins = [];
      const self = this;
      this.options.craftPlugins.forEach(function(option) {
        const plugin = plugins[option];
        if (plugin.src.indexOf('http') == -1) {
          composerPlugins.push(plugin);
          return;
        }
        const downloadUrl = plugin.src + 'archive/' + plugin.branch + '.zip';
        const downloadPromise = download(downloadUrl, self.destinationPath('craft/plugins/downloads'), {
          extract: true
        });
        installationPromises.push(downloadPromise);
      });

      // Render composer.json
      this.fs.copyTpl(
        this.templatePath('composer.json'),
        this.destinationPath('composer.json')
      );

      return Promise.all(installationPromises).then(function() {
        progress.stop();
      });
    }).bind(this)();

    // Moves plugins
    const self = this;
    this.options.craftPlugins.forEach(function(option) {
      const plugin = plugins[option];
      if (plugin.src.indexOf('http') == -1) return;
      // const pluginDirName = plugin.src.match(/\/(.*)\.zip$/)
      const pluginDirPath = self.destinationPath('craft/plugins/downloads/' + plugin.githubName + '-' + plugin.branch.replace(/^v/, '') + '/' + option);
      if (!fs.existsSync(pluginDirPath)) return;
      fs.renameSync(pluginDirPath, self.destinationPath('craft/plugins/' + option));
    });
    del.sync([self.destinationPath('craft/plugins/downloads/')]);

    // Sets necessary permissions
    this.log(chalk.green('> Setting global permissions to 755 / 644'));
    childProcess.execSync('chmod -R 755 *');
    childProcess.execSync('find . -type f -exec chmod 644 {} \\;');

    this.log(chalk.green('> Setting permissions on craft/app to 775 / 644'));
    childProcess.execSync('chmod -R 775 craft/app');
    childProcess.execSync('find craft/app/ -type f -exec chmod 664 {} \\;');

    this.log(chalk.green('> Setting permissions on craft/config to 775 / 644'));
    childProcess.execSync('chmod -R 775 craft/config');
    childProcess.execSync('find craft/config/ -type f -exec chmod 664 {} \\;');

    this.log(chalk.green('> Setting permissions on craft/storage to 775 / 644'));
    childProcess.execSync('chmod -R 775 craft/storage');
    childProcess.execSync('find craft/storage/ -type f -exec chmod 664 {} \\;');
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
