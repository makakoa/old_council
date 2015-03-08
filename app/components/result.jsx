'use strict';

var React = require('react');
var Radium = require('radium');

var OptionResult = require('./result-option');
var Text = require('./text');

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
      width: this.props.ws.ww * 0.95,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5px',
      padding: '10px'
    };

    var options = [];
    if (this.props.options) options = this.props.options;
    var optionsResults = options.map(this.buildResults);

    return (
      <div className='Result'
        style={this.buildStyles(styles)}>
        <Text
          ws={this.props.ws}
          fStyle='italic'
          value={this.props.prompt}/>
        {optionsResults}
      </div>
    );
  }
});
