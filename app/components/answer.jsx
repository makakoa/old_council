'use strict';

var React = require('react');

var Link = require('./link');

module.exports = React.createClass({
  displayName: 'Giver',
  propTypes: {},
  mixins: [],

  getInitialState: function() {return null;},

  componentWillMount: function() {},

  componentWillUnmount: function() {},

  render: function() {
    return (
      <div className='Answerer'>
        <h1>Council, I seek your guidance...</h1>
        <p>What is life?</p>
        <button>a game</button><br/>
        <button>a mystery</button><br/>
        <button>a blessing</button><br/>
        <br/>
        <button>Make a sugggestion</button><br/>
        <p>**Need list of answerable questions**</p>
        <br/>
        <Link to='home'>Leave Council</Link>
      </div>
    );
  }
});
