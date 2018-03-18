'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:stylelint', () => {
  describe('default', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/stylelint'))
        .withOptions({
          skipInstall: false
        });
    });

    it('creates files', () => {
      assert.file([
        '.stylelintrc'
      ]);
    });

    it('adds dependencies', () => {
      assert.fileContent('package.json', 'stylelint-config-odc');
    });
  });
});
