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
        'gulp/tasks'
      ]);
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

    it('creates nunjucks build file', () => {
      assert.file([
        'gulp/tasks/nunjucks.js'
      ]);
    });
  });
});
