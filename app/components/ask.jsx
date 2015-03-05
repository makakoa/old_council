'use strict';

var React = require('react');
// require actions

var Link = require('./link');
var AskForm = require('./ask-form');

module.exports = React.createClass({
  displayName: 'Ask',
  propTypes: {},
  mixins: [],

  getInitialState: function() {return null;},

  componentWillMount: function() {},

  componentWillUnmount: function() {},

  render: function() {
    return (
      <div className='question'>
        <h1>Present your situation...</h1>
        <AskForm />
        /*<input placeholder='question' />
        <button>Ask</button><br/>
        <ul>
          <input value='Yes' /><br/>
          <input value='No' /><br/>
          <button>Add option</button>
        </ul>
        <p>**Need forward to waiting page or accounts for results**</p>
        <br/>*/
        <Link to='home'>Nevermind</Link>
      </div>
    );
  }
});
