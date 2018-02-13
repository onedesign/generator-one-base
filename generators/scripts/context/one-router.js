const imports = `
const oneRouter = require('one-router');
`;

const globalAppVars = `
APP.globalRoute = require('./routes/global');
APP.homeRoute = require('./routes/home');
`;

const initFunction = `
  // Configure Routing
  // Each route should be defined in a routename.js file in /scripts/routes

  var routes = {
    '^/$': APP.indexRoute
  };

  APP.router = new OneRouter(routes);

  // Trigger Global Setup
  APP.globalRoute();
`;

module.exports = {
  imports,
  globalAppVars,
  initFunction
};
