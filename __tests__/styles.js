'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:styles', () => {
  describe('default', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/styles'))
        .inDir(path.resolve('../build-tmp'));
    });

    it('creates files', () => {
      assert.file([
        'src/styles/main.scss',
        'src/styles/base',
        'src/styles/util',
        'src/styles/vendor'
      ]);
    });
  });

  describe('Sass MQ option', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/styles'))
        .withPrompts({
          deps: ['sass-mq']
        });
    });

    it('adds Sass MQ', () => {
      assert.fileContent('src/styles/base/_variables.scss', '// Sass MQ');
    });
  });

  describe('One Sass Toolkit option', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/styles'))
        .withPrompts({
          deps: ['one-sass-toolkit']
        });
    });

    it('adds one-sass-toolkit', () => {
      assert.fileContent('src/styles/base/_variables.scss', '// One Sass Toolkit');
    });
  });

  describe('Susy option', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/styles'))
        .withPrompts({
          deps: ['susy']
        });
    });

    it('adds susy', () => {
      assert.fileContent('src/styles/base/_variables.scss', '// Susy Config');
    });
  });
});
