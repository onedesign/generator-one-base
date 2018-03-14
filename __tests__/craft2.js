'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:craft-2', () => {
  describe('default', () => {
    const promptAnswers = {
      projectTitle: 'Craft2 Project',
      projectName: 'craft2-project',
      projectDescription: 'Craft2 project description',
      craftPlugins: ['minify']
    };

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/craft2'))
        .withPrompts(promptAnswers);
    });

    it('downloads craft', () => {
      assert.file([
        'public/index.php',
        'craft/templates/index.html'
      ]);
    });

    it('configures craft', () => {
      assert.fileContent('craft/config/general.php', "getenv('APP_SITE_URL')");
      assert.fileContent('craft/config/db.php', "getenv('APP_DB_SERVER')");
    });

    it('installs plugins with composer', () => {
      assert.fileContent('composer.json', `"${promptAnswers.craftPlugins['minify'].src}":`);
    });

    it('adds .gitignore', () => {
      assert.fileContent('.gitignore', '# Craft 2');
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
