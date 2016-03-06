'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

module.exports = act.cl({
  mixins: [styler],

  render: function() {
    var styles = {
      fontFamily: '\'Raleway\', Open sans',
      fontSize: this.props.ws.ww / 40,
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
      {style: this.buildStyles(styles)},
      this.props.value
    );
  }
});
