'use strict';

var React = require('react');
var act = require('lib/act');
var Router = require('react-router');

//Import components
var App = require('components/app');
var Home = require('components/home');
var About = require('components/about');
var Ask = require('components/asking/ask');
var Results = require('components/results/results');
var Council = require('components/answering/council');
var NotFound = require('components/notfound');

//Router setup
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var routes = act.el(
  Route,
  {handler: App, path: '/'},
  act.el(DefaultRoute, {name: 'home', handler: Home}),
  act.el(Route, {name: 'council', handler: Council}),
  act.el(Route, {name: 'ask', handler: Ask}),
  act.el(Route, {name: 'results', handler: Results}),
  act.el(Route, {name: 'about', handler: About}),
  act.el(NotFoundRoute, {handler: NotFound})
);

module.exports = {
  run: function run(el) {
    Router.run(routes, function (Handler, state) {
      var params = state.params;
      React.render(act.el(Handler, {params: params}), el);
    });
  }
};
