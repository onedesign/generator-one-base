module.exports = {
  buildProcess: [
    {
      name: 'buildProcess',
      type: 'list',
      message: 'What build process would you like to use?',
      default: 0,
      choices: [
        {
          name: 'Blendid',
          value: 'blendid'
        },
        {
          name: 'ODC Gulp',
          value: 'odcGulp'
        }
      ]
    }
  ]
};
