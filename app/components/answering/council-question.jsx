'use strict';

var React = require('react');
var Radium = require('radium');

var Option = require('./council-question-options');
var Text = require('../text');

module.exports = React.createClass({
  displayName: 'CouncilQuestion',
  mixins: [Radium.StyleResolverMixin],

  buildOptions: function(fields, index) {
    return (
      <Option
        ws={this.props.ws}
        _id={this.props._id}
        index={index}
        question={this.props.question}
        value={fields.option}/>
    );
  },

  render: function() {
    var styles = {
      background: '#FFFFF0',
      border: '1px solid black',
      width: this.props.ws.ww * 0.475,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5px',
      padding: '10px'
    };

    if (this.props.options.length) {
      var options = this.props.options.map(this.buildOptions);
    }

    return (
      <div className='CouncilQuestion'
        style={this.buildStyles(styles)}>
        <Text
          value={this.props.prompt}
          ws={this.props.ws}/>
        {options}
      </div>
    );
  }
});
