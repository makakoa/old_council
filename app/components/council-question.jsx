'use strict';

var React = require('react');

var Option = require('./council-question-options');

module.exports = React.createClass({
  displayName: 'CouncilQuestion',

  buildOptions: function(fields, index) {
    return (
      <Option
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
        <p>"{this.props.prompt}"</p>
        {options}
      </div>
    );
  }
});
