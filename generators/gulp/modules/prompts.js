module.exports = function(options) {
  const questions = [];

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
  }

  if (options.templateSrc == null) {
    questions.push({
      type: 'input',
      name: 'templateSrc',
      message: 'Templates source path',
      default: 'src/templates/'
    });
  }

  if (options.templateDist == null) {
    questions.push({
      type: 'input',
      name: 'templateDist',
      message: 'Templates output path',
      default: 'dist/'
    });
  }

  //
  //   Browsersync
  //
  //////////////////////////////////////////////////////////////////////
  if (options.useProxy == null) {
    questions.push({
      type: 'confirm',
      name: 'useProxy',
      message: 'Use a proxy URL for Browsersync?',
      default: false
    });
  }

  if (options.serverBaseDir == null) {
    questions.push({
      type: 'input',
      name: 'serverBaseDir',
      message: 'Base directory for Browsersync server',
      default: 'dist/'
    });
  }

  //
  //    Engines
  //
  //////////////////////////////////////////////////////////////////////
  if (options.useNunjucks == null) {
    questions.push({
      type: 'confirm',
      name: 'useNunjucks',
      message: 'Add support for nunjucks template engine to gulp build process?',
      default: false
    });
  }

  return questions;
};
