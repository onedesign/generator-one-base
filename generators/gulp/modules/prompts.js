var configForPlatform = require('./config_for_platform');

module.exports = function(options) {
  var questions = [];

  //
  //   Platform Template Defaults
  //
  //////////////////////////////////////////////////////////////////////

  // If a platform was explicitly passed in (by a parent generator, for instance)
  // we should update the options with the defaults so we don't need to prompt the
  // user for them again.

  if (options.platform != null) {
    options = Object.assign(options, configForPlatform(options.platform));
  };

  //
  //   Project Name
  //
  //////////////////////////////////////////////////////////////////////
  if (options.projectName == null) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'What is your project’s name?',
      default: 'my-project'
    });
  };

  //
  //   Platform Template
  //
  //////////////////////////////////////////////////////////////////////
  if (options.platform == null) {
    questions.push({
      type: 'list',
      name: 'platform',
      message: 'Would you like to use a platform template? (this will automatically configure the build settings to work with common platforms',
      choices: [
        {
          name: 'Craft 2',
          value: 'craft2'
        },
        {
          name: 'Craft 3',
          value: 'craft3'
        },
        {
          name: 'Static',
          value: 'static'
        },
        {
          name: 'Static w/ Nunjucks',
          value: 'staticNunjucks'
        }
      ]
    });
  };

  //
  //   Paths
  //
  //////////////////////////////////////////////////////////////////////
  if (options.rootDistPath == null) {
    questions.push({
      type: 'input',
      name: 'rootDistPath',
      message: 'Root path for all output files',
      default: function(answers) {
        return configForPlatform(answers.platform, 'rootDistPath');
      }
    });
  };
  
  if (options.templateSrc == null) {
    questions.push({
      type: 'input',
      name: 'templateSrc',
      message: 'Templates source path',
      default: function(answers) {
        return configForPlatform(answers.platform, 'templateSrc');
      }
    })
  };
  if (options.templateDist == null) {
    questions.push({
      type: 'input',
      name: 'templateDist',
      message: 'Templates output path',
      default: function(answers) {
        return configForPlatform(answers.platform, 'templateDist');
      }
    })
  };

  //
  //   Browsersync
  //
  //////////////////////////////////////////////////////////////////////
  if (options.useProxy == null) {
    questions.push({
      type: 'confirm',
      name: 'useProxy',
      message: 'Use a proxy URL for Browsersync?',
      default: function(answers) {
        return configForPlatform(answers.platform, 'useProxy');
      }
    })
  };
  if (options.serverBaseDir == null) {
    questions.push({
      type: 'input',
      name: 'serverBaseDir',
      message: 'Base directory for Browsersync server',
      default: function(answers) {
        return configForPlatform(answers.platform, 'serverBaseDir');
      }
    })
  };

  return questions;
}
