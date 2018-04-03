<%_ if (deps.includes('one-router')) { _%>
import OneRouter from 'one-router';
<%_ } _%>

//
//   Global App Variable
//
//////////////////////////////////////////////////////////////////////

window.APP = window.APP || {};
<%_ if (deps.includes('one-router')) { _%>
import globalRoute from './routes/global';
import homeRoute from './routes/home';
<%_ } _%>


//
//   App Initiation
//
//////////////////////////////////////////////////////////////////////

APP.init = function() {
  <%_ if (deps.includes('one-router')) { _%>
  // Configure Routing
  // Each route should be defined in a routename.js file in /scripts/routes

  const routes = {
    '^/$': homeRoute
  };

  APP.router = new OneRouter(routes);

  // Trigger Global Setup
  globalRoute();
  <%_ } _%>
};


//
//   Kickoff
//
//////////////////////////////////////////////////////////////////////

APP.init();
