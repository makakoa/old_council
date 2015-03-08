'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;
var Button = require('./button');

module.exports = React.createClass({
  render: function() {
    var linkCb;
    if (!this.props.linkCb) {
      linkCb = function() {
        console.log('Routing to ' + this.props.to);
      }
    } else {
      linkCb = this.props.linkCb;
    }
    return (
      <Link to={this.props.to}>
        <Button
          kind='link'
          buttonCallback={linkCb}
          {...this.props}
          value={this.props.value}/>
      </Link>
    );
  }
});
