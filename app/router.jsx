'use strict';

var React = require('react');
var Router = require('react-router');
// require components here
var App = require('./components/app');
var Home = require('./components/home');
var NotFound = require('./components/notfound');

//Router setup
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route handler={App} path='/'>
    <DefaultRoute name='app' handler={Home} />
    //add other views here
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = {
  run: function(el) {
    Router.run(routes, function(Handler, state) {
      var params = state.params;
      React.render(<Handler params={params} />, el);
    });
  }
};
