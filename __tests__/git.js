'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:git', () => {
  describe('default', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/git'));
    });

    it('creates files', () => {
      assert.file([
        '.git',
        '.gitignore',
        '.github/PULL_REQUEST_TEMPLATE.md',
        '.git/hooks/pre-commit'
      ]);
    });
  });

  describe('Craft 2 ignore', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/git'))
        .withOptions({
          platform: 'craft2'
        });
    });

    it('appends the Craft 2 ignore information', () => {
      assert.fileContent('.gitignore', '# Craft 2.X');
    });
  });

  describe('Craft 3 ignore', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/git'))
        .withOptions({
          platform: 'craft3'
        });
    });

    it('appends the Craft 3 ignore information', () => {
      assert.fileContent('.gitignore', '# Craft 3.X');
    });
  });
});
