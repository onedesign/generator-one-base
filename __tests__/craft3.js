'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:craft-3', () => {
  describe('default', () => {
    const promptAnswers = {
      projectTitle: 'Test Project',
      projectName: 'test-project',
      projectDescription: 'project description this is',
      craftPlugins: ['clubstudioltd/craft-asset-rev']
    };

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/craft3'))
        .withPrompts(promptAnswers);
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
      assert.fileContent('composer.json', `"${promptAnswers.craftPlugins[0]}":`);
    });

    it('configures assetrev plugin', () => {
      assert.file('config/assetrev.php');
    });

    it('adds .gitignore', () => {
      assert.fileContent('.gitignore', '# Craft');
    });

    it('adds a README.md', () => {
      assert.fileContent('README.md', `# ${promptAnswers.projectTitle}`);
    });

    it('writes a package.json with project details', () => {
      assert.fileContent('package.json', `"name": "${promptAnswers.projectName}",`);
      assert.fileContent('package.json', `"description": "${promptAnswers.projectDescription}",`);
    });
  });
});
