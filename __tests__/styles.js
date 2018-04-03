'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:styles', () => {
  describe('default', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/styles'))
        .withPrompts({
          deps: []
        });
    });

    it('creates files', () => {
      assert.file([
        'src/styles/main.scss',
        'src/styles/base',
        'src/styles/util'
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
      assert.fileContent('src/styles/main.scss', 'sass-mq/');
      assert.fileContent('src/styles/base/_variables.scss', '// Media Queries');
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
      assert.fileContent('src/styles/main.scss', 'one-sass-toolkit/');
      assert.fileContent('src/styles/base/_variables.scss', '// Colors');
      assert.fileContent('src/styles/base/_variables.scss', '// Spacing');
      assert.fileContent('src/styles/base/_variables.scss', '// Type – Font Stacks');
      assert.fileContent('src/styles/base/_variables.scss', '// Type – Styles');
    });
  });
});
