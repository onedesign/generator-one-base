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
        this.templatePath('gulp/tasks'),
        this.destinationPath('gulp/tasks')
      );

      this.fs.copyTpl(
        this.templatePath('gulp/config.js'),
        this.destinationPath('gulp/config.js'), {
          projectName: this.options.projectName,
          rootDistPath: this.options.rootDistPath,
          templateSrc: this.options.templateSrc,
          templateDist: this.options.templateDist,
          isCraft: this.options.isCraft,
          useProxy: this.options.useProxy
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
        'babel-preset-es2015',
        'babel-preset-react',
        'babel-preset-stage-2',
        'browser-sync',
        'del',
        'eslint',
        'eslint-config-odc',
        'eslint-plugin-react',
        'gulp',
        'autoprefixer',
        'gulp-css-globbing',
        'gulp-eslint',
        'gulp-postcss',
        'gulp-imagemin',
        'gulp-pixrem',
        'gulp-replace',
        'gulp-rev',
        'gulp-sass',
        'gulp-shell',
        'gulp-svg-sprite',
        'gulp-uglify',
        'gulp-util',
        'node-libs-browser',
        'postcss-import',
        'require-dir',
        'run-sequence',
        'script-loader',
        'strip-ansi'
      ];

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
