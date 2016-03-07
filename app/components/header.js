'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

module.exports = act.cl({
  displayName: 'header',

  render: function render() {
    var proportion; //modifier won't scale size
    if (!this.props.proportion) {
      proportion = 1;
    } else {
      proportion = this.props.proportion;
    }

    var styles = {
      'font-family': '\'Raleway\', Open sans',
      'font-size': '30px',
      'font-weight': 'bold',
      margin: 0,
      padding: 0
    };

    return act.el(
      'p',
      {style: styler(styles)},
      this.props.value
    );
  }
});
