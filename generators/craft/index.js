'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var download = require('download');
var del = require('del');
var PleasantProgress = require('pleasant-progress');
var progress = new PleasantProgress();
var child_process = require('child_process');
var prompts = require('./modules/prompts');

module.exports = Generator.extend({
  initializing: function() {
    
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
        this.destinationPath('craft/config/general.php'),
        this.destinationPath('craft/config/db.php'),
        this.destinationPath('craft/templates/news'),
        this.destinationPath('craft/templates/_layout.html'),
        this.destinationPath('craft/templates/index.html'),
        this.destinationPath('craft/templates/404.html'),
      ]);
    },

    composer: function() {
      this.fs.copyTpl(
        this.templatePath('composer.json'),
        this.destinationPath('composer.json'), {
          craftPlugins: this.options.craftPlugins
        }
      );
    },

    env: function() {
      this.fs.copyTpl(
        this.templatePath('env.sample'),
        this.destinationPath('env.sample'), {
          projectName: this.options.projectName
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
      if (this.options.craftPlugins.indexOf('https://github.com/clubstudioltd/craft-asset-rev') > -1) {
        this.fs.copy(
          this.templatePath('craft/config/asset-rev.php'),
          this.destinationPath('craft/config/asset-rev.php')
        );
      }

      // Imager
      if (this.options.craftPlugins.indexOf('https://github.com/aelvan/Imager-Craft') > -1) {
        this.fs.copyTpl(
          this.templatePath('craft/config/imager.php'),
          this.destinationPath('craft/config/imager.php'), {
            projectName: this.options.projectName
          }
        );
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
    
  },

  end: {
    
  }
});
