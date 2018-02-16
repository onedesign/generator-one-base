var configForPlatform = require('./config_for_platform');

module.exports = function(options) {
  var questions = [];

  //
  //   Platform Template Defaults
  //
  //////////////////////////////////////////////////////////////////////

  // If a platformTemplate was explicitly passed in (by a parent generator, for instance)
  // we should update the options with the defaults so we don't need to prompt the
  // user for them again.

  if (options.platformTemplate != null) {
    options = Object.assign(options, configForPlatform(options.platformTemplate));
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
  if (options.platformTemplate == null) {
    questions.push({
      type: 'list',
      name: 'platformTemplate',
      message: 'Would you like to use a platform template? (this will automatically configure the build settings to work with common platforms',
      choices: [
        {
          name: 'None',
          value: 'none'
        },
        {
          name: 'Craft 2',
          value: 'craft2'
        },
        {
          name: 'Craft 3',
          value: 'craft3'
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
        return configForPlatform(answers.platformTemplate, 'rootDistPath');
      }
    });
  };
  
  if (options.templateSrc == null) {
    questions.push({
      type: 'input',
      name: 'templateSrc',
      message: 'Templates source path (leave blank for project root)',
      default: function(answers) {
        return configForPlatform(answers.platformTemplate, 'templateSrc');
      }
    })
  };
  if (options.templateDist == null) {
    questions.push({
      type: 'input',
      name: 'templateDist',
      message: 'Templates output path (leave blank for project root)',
      default: function(answers) {
        return configForPlatform(answers.platformTemplate, 'templateDist');
      }
    })
  };

  //
  //   nunjucks
  //
  //////////////////////////////////////////////////////////////////////
  if (options.useNunjucks == null) {
    questions.push({
      type: 'confirm',
      name: 'useNunjucks',
      message: 'Would you like to use nunjucks for templating?',
      default: true,
      store: true
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
      default: false,
      store: false
    })
  };
  if (options.serverBaseDir == null) {
    questions.push({
      type: 'input',
      name: 'serverBaseDir',
      message: 'Base directory for Browsersync server',
      default: function(answers) {
        return answers.useNunjucks ? './dist' : './';
      }
    })
  };

  return questions;
}
