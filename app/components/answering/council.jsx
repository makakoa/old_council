'use strict';

var React = require('react');
var Radium = require('radium');
var CouncilActions = require('../../actions/council-actions');
var CouncilStore = require('../../stores/council-store');

var Link = require('../link');
var Header = require('../header');
var CouncilList = require('./council-list-question');
var CouncilQuestion = require('./council-question');
var Recent = require('../recent');

var getQuestions = function() {
  return CouncilStore.getQuestions();
};

var getCurrent = function() {
  return CouncilStore.getCurrent();
};

module.exports = React.createClass({
  displayName: 'Council',
  mixins: [CouncilStore.mixin, Radium.StyleResolverMixin],

  getInitialState: function() {
    CouncilActions.loadQuestions();
    return {
      _id: '',
      current: {
        prompt: 'Loading...',
        options: []
      },
      questions: []
    };
  },

  storeDidChange: function() {
    console.log('Updating from store');
    var list = getQuestions();
    var single = getCurrent();
    console.log('View current: ' + JSON.stringify(single));
    this.setState({
      questions: list,
      current: single
    });
  },

  buildList: function(fields, index) {
    return (
      <CouncilList
        key={index}
        index={index}
        ws={this.props.ws}
        prompt={fields.prompt}/>
    );
  },

  render: function() {
    var styles = {
      textAlign: 'center',
      paddingTop: this.props.ws.wh/10
    };

    var current;
    var list;
    if (this.state.questions.length > 0) {
      console.log('Assembling list: ' + this.state.questions.length);
      current = this.state.current;
      list = this.state.questions.map(this.buildList);
    } else {
      current = {
        prompt: 'Waiting on requests...',
        options: [],
        _id: ''
      };
    }
    var modWs = {
      ww: this.props.ws.ww *0.7,
      wh: this.props.wh
    };
    return (
      <div className='Council'
        style={this.buildStyles(styles)}>
        <Header
          ws={this.props.ws}
          value='"Council, I seek your guidance..."'/><br/>
        <CouncilQuestion
          ws={this.props.ws}
          _id={current._id}
          prompt={current.prompt}
          options={current.options}/><br/>
          <Header
            proportion='0.5'
            ws={this.props.ws}
            value='Agenda'/>
          {list}
        <br/>
        <Recent
          ws={modWs}/>
        <br/>
        <Link
          ws={this.props.ws}
          to='home'
          kind='danger'
          value='Leave Council' />
      </div>
    );
  }
});
