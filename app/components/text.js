'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

module.exports = act.cl({

  render: function() {
    var styles = {
      fontFamily: '\'Raleway\', Open sans',
      'font-size': '20px',
      margin: 0,
      padding: 0,

      modifiers: [{
        fStyle: {
          bold: {fontWeight: 'bold'},
          italic: {fontStyle: 'italic'}
        }
      }]
    };

    return act.el(
      'p',
      {style: styler(styles)},
      this.props.value
    );
  }
});
