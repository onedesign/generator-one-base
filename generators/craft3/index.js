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
      child_process.execSync(`composer create-project -s RC craftcms/craft ${this.options.projectName}`);
    },

    clean: function() {
      del.sync([
        // this.destinationPath('readme.txt')
      ]);

      // If using SEOmatic, remove default robots.txt
      if (this.options.craftPlugins.indexOf('seomatic') > -1) {
        del.sync([
          this.destinationPath('web/robots.txt')
        ]);
        this.closingStatements.push('robots.txt: ' + chalk.yellow('We removed the default robots.txt because you’re using SEOmatic. Be sure to add your custom robots.txt to the SEOmatic settings in Craft.'));
      }
    },

    public: function() {
      this.fs.copy(
        this.templatePath('web/index.php'),
        this.destinationPath('web/index.php')
      );
      this.fs.copyTpl(
        this.templatePath('web/htaccess'),
        this.destinationPath('web/.htaccess'), {
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
        // this.templatePath('craft/config/general.php'),
        // this.destinationPath('craft/config/general.php')
      );

      // Database
      this.fs.copy(
        // this.templatePath('craft/config/db.php'),
        // this.destinationPath('craft/config/db.php')
      );

      // Asset Rev
      if (this.options.craftPlugins.indexOf('assetrev') > -1) {
        this.fs.copy(
          this.templatePath('craft/config/assetrev.php'),
          this.destinationPath('craft/config/assetrev.php')
        );
      }
    },

    templates: function() {
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
      this.fs.copy(
        this.templatePath('templates/_partials'),
        this.destinationPath('templates/_partials')
      );
    },

    downloadPlugins: function() {
      // Render composer.json
      this.fs.copyTpl(
        this.templatePath('composer.json'),
        this.destinationPath('composer.json'), {
          plugins: this.options.craftPlugins
        }
      );
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
