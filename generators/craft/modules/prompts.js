var plugins = require('./craft_plugins');
var pluginChoices = [];
for (var key in plugins) {
  var plugin = plugins[key];
  pluginChoices.push({
    name: plugin.name,
    value: key,
    checked: plugin.checked
  });
}

module.exports = [
  //
  //   Craft License
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'confirm',
    name: 'acceptCraftLicense',
    message: 'Do you accept the Craft license? (https://craftcms.com/license)',
    default: true,
    store: true
  },

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
]
