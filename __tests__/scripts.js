'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:scripts', () => {
  describe('default', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/scripts'));
    });

    it('creates dir structure', () => {
      assert.file([
        'src/scripts/modules/.gitkeep'
      ]);
    });

    it('creates main.js', () => {
      assert.file([
        'src/scripts/main.js'
      ]);
    });
  });

  describe('enabling one-router', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/scripts'))
        .withPrompts({
          deps: ['one-router']
        });
    });

    it('adds one-router init code', () => {
      assert.fileContent('src/scripts/main.js', "require('one-router')");
    });
  });
});
