'use strict';

var React = require('react');

var Option = require('./council-question-options');

module.exports = React.createClass({
  displayName: 'CouncilQuestion',

  buildOptions: function(fields, index) {
    return (
      <Option
        key={index}
        value={fields.option}/>
    );
  },

  render: function() {
    var options = this.props.options.map(this.buildOptions);
    return (
      <div className='CouncilQuestion'>
        <p>"{this.props.prompt}"</p>
        {options}
      </div>
    );
  }
});
