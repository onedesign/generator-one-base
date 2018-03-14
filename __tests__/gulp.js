'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:gulp', () => {
  describe('default', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          rootDistPath: 'dist',
          templateSrc: 'src/templates/',
          templateDist: 'dist/',
          serverBaseDir: 'dist/',
          useProxy: false,
          useNunjucks: false
        });
    });

    it('creates files', () => {
      assert.file([
        'gulpfile.js',
        '.stylelintrc',
        'gulp/tasks',
        'gulp/tasks/base.js',
        'gulp/tasks/build.js'
      ]);
    });

    it('doesn\'t create index.html', () => {
      assert.noFile('index.html');
    });

    it('adds .gitgnore rules', () => {
      assert.fileContent('.gitignore', '/dist');
    });
  });

  describe('with nunjucks enabled', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          rootDistPath: 'dist',
          templateSrc: 'src/templates/',
          templateDist: 'dist/',
          serverBaseDir: 'dist/',
          useProxy: false,
          useNunjucks: true
        });
    });

    it('creates nunjucks build files', () => {
      assert.file([
        'gulp/tasks/nunjucks.js'
      ]);
      assert.fileContent('gulp/tasks/base.js', "'nunjucks',");
      assert.fileContent('gulp/tasks/watch.js', "runSequence('nunjucks')");
    });

    it('creates nunjucks index.html', () => {
      assert.file('index.html');
    });
  });
});
