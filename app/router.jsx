'use strict';

var React = require('react');
var Router = require('react-router');
// require components here
//var App = require('./components/app');

//Router setup
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route handler={App} path='/'>
    <DefaultRoute name='app' handler={Home} />
    //add other views here
  </Route>
);

modules.exports = {
  run: function(el) {
    Router.run(routes, function(Handler, state) {
      var params = state.params;
      React.render(<Handler params={params} />, el);
    });
  }
};
