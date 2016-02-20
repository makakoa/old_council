'use strict';

var React = require('react');
var Radium = require('radium');

var OptionResult = require('./result-option');
var Text = require('../text');
var Header = require('../header');

module.exports = React.createClass({
  displayName: 'Result',
  mixins: [Radium.StyleResolverMixin],

  buildResults: function(fields, index) {
    return (
        <OptionResult
      ws={this.props.ws}
      option={fields.option}
      result={fields.result}/>
    );
  },

  render: function() {
    var styles = {
      background: '#FFFFF0',
      border: '1px solid black',
      borderRadius: '10px',
      width: this.props.ws.ww * 0.5,
      'text-align': 'left',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5px',
      padding: '20px'
    };

    var options = [];
    if (this.props.options) options = this.props.options;
    var optionsResults = options.map(this.buildResults);

    return (
        <div className='Result'
      style={this.buildStyles(styles)}>
        <Header
      ws={this.props.ws}
      proportion={0.5}
        value={this.props.prompt}/>
        {optionsResults}
      </div>
    );
  }
});
