var OneRouter = require('one-router');

//
//   Global App Variable
//
//////////////////////////////////////////////////////////////////////

window.APP = window.APP || {};

APP.globalRoute = require('./modules/routes/global_route');
APP.indexRoute = require('./modules/routes/index_route');


//
//   App Initiation
//
//////////////////////////////////////////////////////////////////////

APP.init = function() {
  // Configure Routing
  // Each route should be defined in a routename_route.js file in /scripts/modules/routes

  var routes = {
    '/$': APP.indexRoute
  };

  APP.router = new OneRouter(routes);

  // Trigger Global Setup
  APP.globalRoute();
};


//
//   Kickoff
//
//////////////////////////////////////////////////////////////////////

APP.init();