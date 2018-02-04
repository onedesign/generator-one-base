'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:styles', () => {
  describe('default', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/styles'));
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
});
