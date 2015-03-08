'use strict';

var React = require('react');

var Header = require('./header');

module.exports = React.createClass({
  displayName: 'OptionResult',

  render: function() {
    return (
      <div className='OptionResult'>
        <Header
          ws={this.props.ws}
          kind={this.props.result}
          value={this.props.option}/>
      </div>
    );
  }
});
