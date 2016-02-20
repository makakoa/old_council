'use strict';

var React = require('react');
var Radium = require('radium');

var Link = require('./link');
var Header = require('./header');
var Text = require('./text');

var summary = 'Welcome to The Council.\n Here, answers are sought and answers are given.\n\n "Seek Guidance" to ask questions.\n\n "Advise" to join The Council and provide guidance.\n\nQuestions have 30 seconds to be answered by The Council.';

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
        'white-space': 'pre-wrap',
        'background-color': 'white',
        fontWeight: 'bold',
        'border-radius': '10px',
        'padding': '1em'
    };

    return (
      <div className='About'
        style={this.buildStyles(styles)}>
        <Header
          ws={this.props.ws}
          value='About'/>
        <br/>
        <Text
          ws={this.props.ws}
          style={this.buildStyles(summaryStyle)}
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
