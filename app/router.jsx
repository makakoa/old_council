'use strict';

var React = require('react');
var Router = require('react-router');

//Import components
var App = require('./components/app');
var Home = require('./components/home');
var About = require('./components/about');
var Ask = require('./components/asking/ask');
var Results = require('./components/asking/results');
var Council = require('./components/answering/council');
var NotFound = require('./components/notfound');

//Router setup
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route handler={App} path='/'>
    <DefaultRoute name='home' handler={Home} />
    <Route name='ask' handler={Ask} />
    <Route name='results' handler={Results} />
    <Route name='council' handler={Council} />
    <Route name='about' handler={About} />
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
