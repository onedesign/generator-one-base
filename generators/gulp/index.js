'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./modules/prompts');

module.exports = Generator.extend({
  initializing: function() {

  },

  prompting: function() {
    return this.prompt(prompts(this.options)).then(function(options) {
      Object.assign(this.options, options);
    }.bind(this));
  },

  writing: {
    setRoot: function() {
      this.destinationRoot('./');
    },

    gulp: function() {
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );

      this.fs.copy(
        this.templatePath('stylelintrc'),
        this.destinationPath('.stylelintrc')
      );

      this.fs.copyTpl(
        this.templatePath('gulp/tasks'),
        this.destinationPath('gulp/tasks'), {
          platform: this.options.platform
        }, {}, {
          globOptions: {
            ignore: this.options.platform == 'staticNunjucks' ? [] : ['**/nunjucks.js']
          }
        }
      );

      this.fs.copy(
        this.templatePath('gulp/utils'),
        this.destinationPath('gulp/utils')
      );

      this.fs.copyTpl(
        this.templatePath('gulp/config.js'),
        this.destinationPath('gulp/config.js'), {
          projectName: this.options.projectName,
          rootDistPath: this.options.rootDistPath,
          templateSrc: this.options.templateSrc,
          templateDist: this.options.templateDist,
          platform: this.options.platform,
          serverBaseDir: this.options.serverBaseDir,
          useProxy: this.options.useProxy
        }
      );
    },

    indexHtml: function() {
      if (this.options.platform != 'static') return;

      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('index.html'),
        {
          projectTitle: this.options.projectTitle
        }
      );
    },

    nunjucks: function() {
      if (!this.options.platform == 'staticNunjucks') return;

      this.fs.copyTpl(
        this.templatePath('templates'),
        this.destinationPath('src/templates'), {
          projectTitle: this.options.projectTitle
        }
      );
    }
  },

  install: {
    installDependencies: function() {
      var devDependencies = [
        'webpack',
        'babel-core',
        'babel-eslint',
        'babel-loader',
        'babel-preset-env',
        'babel-preset-react',
        'browser-sync',
        'del',
        'dotenv',
        'eslint',
        'eslint-config-odc',
        'eslint-plugin-react',
        'gulp',
        'autoprefixer',
        'gulp-changed-in-place',
        'gulp-css-globbing',
        'gulp-eslint',
        'gulp-postcss',
        'gulp-imagemin',
        'gulp-pixrem',
        'gulp-replace',
        'gulp-rev',
        'gulp-sass',
        'gulp-shell',
        'gulp-stylelint',
        'stylelint',
        'stylelint-scss',
        'gulp-util',
        'jsonfile',
        'node-libs-browser',
        'postcss-import',
        'require-dir',
        'run-sequence',
        'script-loader',
        'strip-ansi'
      ];

      // Add nunjucks if desired
      if (this.options.platform == 'staticNunjucks') {
        devDependencies.push('gulp-nunjucks-render');
      }

      var self = this;

      // Display a message
      this.log(chalk.yellow('\nInstalling gulp-related dependencies via yarn: '));

      // Install dev dependencies
      self.yarnInstall(devDependencies, { 'dev': true });
    }
  },

  end: function() {

  }
});
