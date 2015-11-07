'use strict';

var React = require('react');
var Radium = require('radium');

var Link = require('./link');
var Header = require('./header');
var Text = require('./text');

var summary = 'Welcome to The Council.\nHere you may seek answers by asking a question to The Council or provide valuable guidance to those looking for answers.\n "Seek Guidance" to ask a question.\n "Advise" to join The Council and provide guidance.\nQuestions have 30 seconds to be answered by The Council. If The Council cannot come to a conclusion, they will flip a coin and let the universe decide. Pro tip: The Council will *pop* when new requests arrive if you are on The Council and the app is open.';

module.exports = React.createClass({
  displayName: 'About',
  mixins: [Radium.StyleResolverMixin],

  render: function() {
    var styles = {
      paddingTop: this.props.ws.wh/10,
      textJustify: 'inter-word',
      textAlign: 'center',
      width: this.props.ws.ww *0.7,
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    var summaryStyle = {
        'background-color': 'white',
        'border-radius': '1em',
        'padding': '1em'
    };

    return (
      <div className='About'
        style={this.buildStyles(styles)}>
        <Header
          ws={this.props.ws}
          value='The Council'/>
        <br/>
        <Text
          ws={this.props.ws}
          style={this.buildStyles(summaryStyle)}
          fStyle='italic'
          value={summary}/>
        <br/>
        <br/>
        <Link to='home'
          value='Return to The Council'
          ws={this.props.ws}/>
      </div>
    );
  }
});
