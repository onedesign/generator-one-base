'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:eslint', () => {
  describe('default', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/eslint'))
        .withOptions({
          skipInstall: false
        });
    });

    it('creates files', () => {
      assert.file([
        '.eslintrc.json'
      ]);
    });

    it('adds dependencies', () => {
      assert.fileContent('package.json', 'eslint');
      assert.fileContent('package.json', 'eslint-config-odc');
    });
  });
});
