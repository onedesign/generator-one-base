'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-git', () => {
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
});
