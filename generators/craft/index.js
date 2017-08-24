'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var download = require('download');
var del = require('del');
var fs = require('fs');
var PleasantProgress = require('pleasant-progress');
var progress = new PleasantProgress();
var child_process = require('child_process');
var prompts = require('./modules/prompts');
var plugins = require('./modules/craft_plugins');

module.exports = Generator.extend({
  initializing: function() {
    this.closingStatements = [];
  },

  prompting: function() {
    return this.prompt(prompts).then(function(options) {
      Object.assign(this.options, options);
    }.bind(this));
  },

  writing: {
    setRoot: function() {
      this.destinationRoot('./');
    },

    downloadCraft: function() {
      var craftDownloadUrl = 'http://buildwithcraft.com/latest.zip?accept_license=yes';
      progress.start('Installing Craft');
      return download(craftDownloadUrl, this.destinationPath(), {
        extract: true
      }).then(function() {
        progress.stop();
      });
    },

    clean: function() {
      del.sync([
        this.destinationPath('readme.txt'),
        this.destinationPath('public/index.php'),
        this.destinationPath('public/htaccess'),
        this.destinationPath('craft/config/general.php'),
        this.destinationPath('craft/config/db.php'),
        this.destinationPath('craft/templates/news'),
        this.destinationPath('craft/templates/_layout.html'),
        this.destinationPath('craft/templates/index.html'),
        this.destinationPath('craft/templates/404.html'),
      ]);

      // If using SEOmatic, remove default robots.txt
      if (this.options.craftPlugins.indexOf('seomatic') > -1) {
        del.sync([
          this.destinationPath('public/robots.txt')
        ]);
        this.closingStatements.push('robots.txt: ' + chalk.yellow('We removed the default robots.txt because you’re using SEOmatic. Be sure to add your custom robots.txt to the SEOmatic settings in Craft.'));
      }
    },

    public: function() {
      this.fs.copy(
        this.templatePath('public/index.php'),
        this.destinationPath('public/index.php')
      );
      this.fs.copyTpl(
        this.templatePath('public/htaccess'),
        this.destinationPath('public/.htaccess'), {
          projectName: this.options.projectName
        }
      );
    },

    env: function() {
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
    },

    config: function() {
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
      if (this.options.craftPlugins.indexOf('assetrev') > -1) {
        this.fs.copy(
          this.templatePath('craft/config/assetrev.php'),
          this.destinationPath('craft/config/assetrev.php')
        );
      }

      // Imager
      if (this.options.craftPlugins.indexOf('imager') > -1) {
        this.fs.copyTpl(
          this.templatePath('craft/config/imager.php'),
          this.destinationPath('craft/config/imager.php'), {
            projectName: this.options.projectName
          }
        );
        this.closingStatements.push('Imager: ' + chalk.yellow('If you’re planning on using AWS with Imager, be sure to uncomment the AWS-related lines in .env'));
      }
    },

    templates: function() {
      this.fs.copy(
        this.templatePath('craft/templates/_layout.html'),
        this.destinationPath('craft/templates/_layout.html')
      );
      this.fs.copy(
        this.templatePath('craft/templates/index.html'),
        this.destinationPath('craft/templates/index.html')
      );
      this.fs.copy(
        this.templatePath('craft/templates/404.html'),
        this.destinationPath('craft/templates/404.html')
      );
      this.fs.copy(
        this.templatePath('craft/templates/_partials'),
        this.destinationPath('craft/templates/_partials')
      );
    },

    downloadPlugins: function() {
      progress.start('Installing Craft Plugins');
      var installationPromises = [];
      var composerPlugins = [];
      var self = this;
      this.options.craftPlugins.forEach(function(option) {
        var plugin = plugins[option];
        if (plugin.src.indexOf('http') == -1) {
          composerPlugins.push(plugin);
          return;
        };
        var downloadPromise = download(plugin.src, self.destinationPath('craft/plugins/downloads'), {
          extract: true
        })
        installationPromises.push(downloadPromise);
      });

      // Render composer.json
      this.fs.copyTpl(
        this.templatePath('composer.json'),
        this.destinationPath('composer.json'), {
          plugins: composerPlugins
        }
      );

      return Promise.all(installationPromises).then(function() {
        progress.stop();
      });
    },

    movePlugins: function() {
      var self = this;
      this.options.craftPlugins.forEach(function(option) {
        var plugin = plugins[option];
        if (plugin.src.indexOf('http') == -1) return;
        var pluginDirPath = self.destinationPath('craft/plugins/downloads/' + plugin.githubName + '-master/' + option);
        if (!fs.existsSync(pluginDirPath)) return;
        fs.renameSync(pluginDirPath, self.destinationPath('craft/plugins/' + option));
      });
      del.sync([self.destinationPath('craft/plugins/downloads/')]);
    },

    permissions: function() {
      console.log(chalk.green('> Setting global permissions to 755 / 644'));
      child_process.execSync('chmod -R 755 *');
      child_process.execSync('find . -type f -exec chmod 644 {} \\;');
      console.log(chalk.green('> Setting permissions on craft/app to 775 / 644'));
      child_process.execSync('chmod -R 775 craft/app');
      child_process.execSync('find craft/app/ -type f -exec chmod 664 {} \\;');
      console.log(chalk.green('> Setting permissions on craft/config to 775 / 644'));
      child_process.execSync('chmod -R 775 craft/config');
      child_process.execSync('find craft/config/ -type f -exec chmod 664 {} \\;');
      console.log(chalk.green('> Setting permissions on craft/storage to 775 / 644'));
      child_process.execSync('chmod -R 775 craft/storage');
      child_process.execSync('find craft/storage/ -type f -exec chmod 664 {} \\;');
    }
  },

  install: {
    composer: function() {
      this.log(chalk.yellow('\nInstalling dependencies via composer: '));
      child_process.execSync('composer install');
    }
  },

  end: function() {
    this.log('(be sure to create a ' + chalk.cyan(this.options.projectName) + ' database if you haven’t already)');

    // Output all closing statements
    this.closingStatements.forEach(function(statement) {
      console.log('\n' + statement);
    });
  }
});
