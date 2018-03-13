'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:craft-3', () => {
  describe('default', () => {
    beforeAll(() => {
      jest.setTimeout(30000); // it takes a bit to install craft
      return helpers
        .run(path.join(__dirname, '../generators/craft3'))
        .withPrompts({
          craftPlugins: ['clubstudioltd/craft-asset-rev']
        });
    });

    it('downloads craft', () => {
      assert.file([
        'web/index.php',
        'templates/index.html'
      ]);
    });

    it('configures craft', () => {
      assert.fileContent('config/general.php', "getenv('APP_SITE_URL')");
      assert.fileContent('config/db.php', "getenv('APP_DB_SERVER')");
    });

    it('installs plugins with composer', () => {
      assert.fileContent('composer.json', '"clubstudioltd/craft-asset-rev":');
    });
  });
});
