'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const oneRouterContext = require(path.join(__dirname, '../generators/scripts/context/one-router.js'));

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

  describe('jquery and lodash enabled', () => {
    beforeAll(() => {
      jest.setTimeout(20000);
      return helpers.run(path.join(__dirname, '../generators/scripts'))
        .withPrompts({
          deps: ['jquery', 'lodash']
        })
        .withOptions({
          skipInstall: false
        });
    });

    it('adds jQuery as a dependency via yarn', () => {
      assert.fileContent('package.json', '"jquery":');
    });

    it('adds LoDash as a dependency via yarn', () => {
      assert.fileContent('package.json', '"lodash":');
    });
  });

  describe('one-router option enabled', () => {
    beforeAll(() => {
      jest.setTimeout(20000);
      return helpers.run(path.join(__dirname, '../generators/scripts'))
        .withPrompts({
          deps: ['one-router']
        })
        .withOptions({
          skipInstall: false
        });
    });

    it('adds one-router as a dependency via yarn', () => {
      assert.fileContent('package.json', '"one-router":');
    });

    it('adds one-router init code', () => {
      assert.fileContent('src/scripts/main.js', oneRouterContext.imports);
    });
  });
});
