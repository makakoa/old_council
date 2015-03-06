'use strict';

var React = require('react');
var Router = require('react-router');

//Import components
var App = require('./components/app');
var Home = require('./components/home');
var Ask = require('./components/ask');
var Waiting = require('./components/waiting');
var Results = require('./components/results');
var Answer = require('./components/answer');
var NotFound = require('./components/notfound');

//Router setup
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route handler={App} path='/'>
    <DefaultRoute name='home' handler={Home} />
    <Route name='ask' handler={Ask} />
    <Route name='waiting' handler={Waiting} />
    <Route name='results' handler={Results} />
    <Route name='answer' handler={Answer} />
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
