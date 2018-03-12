const plugins = require('./available-plugins');
const pluginChoices = plugins.map(function(plugin) {
  return {
    name: plugin.name,
    value: plugin.src,
    checked: plugin.checked
  };
});

module.exports = [
  //
  //   Optional Craft Plugins
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'checkbox',
    name: 'craftPlugins',
    message: 'Which optional plugins do you want installed?',
    choices: pluginChoices
  }
];
