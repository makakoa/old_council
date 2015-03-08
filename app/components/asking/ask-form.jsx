'use strict';

var React = require('react');
var QuestionActions = require('../../actions/question-actions');

var QuestionInput = require('./question-input');
var OptionInput = require('./option-input');
var Button = require('../button');

module.exports = React.createClass({
  dipslayName: 'AskForm',

  addOption: function() {
    QuestionActions.createOption();
  },

  deleteOption: function(data) {
    console.log('AskForm: delete option');
    QuestionActions.deleteOption(data.index);
  },

  buildOptions: function(fields, index) {
    return (
      <div className='Option'
        {...this.props}>
        <Button
          buttonCallback={this.deleteOption}
          index={index}
          kind='danger'
          value='X'
          ws={this.props.ws}/>
        <OptionInput
          _id={this.props._id}
          key={index}
          index={index}
          placeholder='Option'
          value={fields.option}
          ws={this.props.ws}/>
      </div>
    );
  },

  render: function() {
    var OptionNodes = this.props.options.map(this.buildOptions);

    return (
      <div className='AskForm'>
        <QuestionInput
          value={this.props.prompt}
          ws={this.props.ws}/>
        {OptionNodes}
        <Button
          buttonCallback={this.addOption}
          value='add option'
          kind='add'
          ws={this.props.ws}/>
      </div>
    )
  }
});
