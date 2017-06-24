module.exports = function(options) {
  var questions = [];

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
  //   Paths
  //
  //////////////////////////////////////////////////////////////////////
  if (options.rootDistPath == null) {
    questions.push({
      type: 'input',
      name: 'rootDistPath',
      message: 'Root path for all output files',
      default: 'dist'
    });
  };
  
  if (options.templateSrc == null) {
    questions.push({
      type: 'input',
      name: 'templateSrc',
      message: 'Templates source path (leave blank for project root)',
      default: ''
    })
  };
  if (options.templateDist == null) {
    questions.push({
      type: 'input',
      name: 'templateDist',
      message: 'Templates output path (leave blank for project root)',
      default: ''
    })
  };

  //
  //   Craft
  //
  //////////////////////////////////////////////////////////////////////
  if (options.isCraft == null) {
    questions.push({
      type: 'confirm',
      name: 'isCraft',
      message: 'Is this a Craft CMS project?',
      default: false,
      store: false
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

  return questions;
}
