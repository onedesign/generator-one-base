module.exports = [
  {
    name: 'platform',
    type: 'list',
    message: 'What platform would you like to use?',
    default: 0,
    choices: [
      {
        name: 'Craft 3.X',
        value: 'craft3'
      },
      {
        name: 'Craft 2.X',
        value: 'craft2'
      },
      {
        name: 'Static',
        value: 'static'
      }
    ]
  }
];
