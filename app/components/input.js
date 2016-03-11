'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

module.exports = act.cl({
  displayName: 'Input',

  handleInputChange: function() {
    this.props.inputCallback({
      _id: this.props._id,
      accessor: this.props.accessor,
      index: this.props.index,
      value: this.refs.inputValue.getDOMNode().value
    });
  },

  render: function() {

    return act.el('input', {
      _id: this.props._id,
      type: 'text',
      ref: 'inputValue',
      value: this.props.value,
      placeholder: this.props.placeholder,
      style: styler({
        fontFamily: '\'Raleway\', Open sans',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px'
      }, this.props.style),
      onChange: this.handleInputChange
    });
  }
});
