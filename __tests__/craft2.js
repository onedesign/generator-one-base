'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:craft-3', () => {
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
      assert.fileContent('config/general.php', "getenv('APP_SITE_URL')");
      assert.fileContent('config/db.php', "getenv('APP_DB_SERVER')");
    });

    it('installs plugins with composer', () => {
      assert.fileContent('composer.json', `"${promptAnswers.craftPlugins[0]}":`);
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
