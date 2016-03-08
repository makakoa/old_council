'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

module.exports = act.cl({
  displayName: 'header',

  render: function render() {
    var styles = {
      'font-family': '\'Raleway\', Open sans',
      'font-size': '20px',
      'font-weight': 'bold',
      margin: 0,
      padding: 0
    };

    return act.el(
      'p',
      {style: styler(styles, this.props.style)},
      this.props.value
    );
  }
});
