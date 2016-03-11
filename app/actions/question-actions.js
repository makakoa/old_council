//actions for questions to be asked

'use strict';

var _ = require('lodash');
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
    return {
      actionType: 'OPTION_DELETED',
      data: data
    };
  },
  askQuestion: function(data) {
    //Todo: remove
    var n = 0;
    var vs = [];
    _.each(_.map(data.options, function() {
      n += Math.floor(Math.random() * 3);
      return n;
    }), function(t) {
      t = Math.floor((t / n) * (30 / n));
      vs.push(t);
    });
    data.votes = vs.reverse();
    data.votes[0] += 1;

    socket.emit('question:submit', data);
    return {
      actionType: 'QUESTION_ASKED',
      data: data
    };
  },
  questionAnswered: function(data) {
    return {
      actionType: 'QUESTION_ANSWERED',
      data: data
    };
  }
});

module.exports = QuestionActions;
