//flux actions using mcfly, general names currently TODO: change

'use strict';

var Flux = require('../Flux');
var socket = require('../socket');

socket.on('question:results', function(data) {
  QuestionActions.questionAnswered(data);
});

var QuestionActions = Flux.createActions({
  createQuestion: function(data) {
    return {
      actionType: 'QUESTION_CREATED',
      data: data
    };
  },
  updatePrompt: function(data) {
    return {
      actionType: 'PROMPT_UPDATED',
      data: data
    };
  },
  createOption: function(data) {
    return {
      actionType: 'OPTION_CREATED',
      data: data
    };
  },
  updateOption: function(data) {
    return {
      actionType: 'OPTION_UPDATED',
      data: data
    };
  },
  deleteOption: function(data) {
    console.log('Action: delete option');
    return {
      actionType: 'OPTION_DELETED',
      data: data
    };
  },
  askQuestion: function(data) {
    socket.emit('question:submit', data);
    console.log('Action: question asked');
    return {
      actionType: 'QUESTION_ASKED',
      data: data
    };
  },
  questionAnswered: function(data) {
    console.log('Action: question answered');
    return {
      actionType: 'QUESTION_ANSWERED',
      data: data
    };
  }
});

module.exports = QuestionActions;
