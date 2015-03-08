'use strict';

var React = require('react');

var Option = require('./council-question-options');
var Text = require('../text');

module.exports = React.createClass({
  displayName: 'CouncilQuestion',

  buildOptions: function(fields, index) {
    return (
      <Option
        ws={this.props.ws}
        _id={this.props._id}
        index={index}
        key={index}
        value={fields.option}/>
    );
  },

  render: function() {
    if (this.props.options.length) {
      var options = this.props.options.map(this.buildOptions);
    }
    return (
      <div className='CouncilQuestion'>
        <Text
          value={this.props.prompt}
          ws={this.props.ws}/>
        {options}
      </div>
    );
  }
});
