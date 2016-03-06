//actions for questions to be answered

'use strict';

var Flux = require('../Flux');
var socket = require('../socket');

var filename = 'pop'; // sound recorded by Mark DiAngelo
var notify = function() {
  window.document.getElementById('sound').innerHTML =
    '<audio autoplay="autoplay"><source src="'
    + filename
    + '.mp3" type="audio/mpeg" /><source src="'
    + filename
    + '.ogg" type="audio/ogg" /><embed hidden="true"'
    + 'autostart="true" loop="false" src="'
    + filename
    + '.mp3" /></audio>';
};

socket.on('question:new', function(data) {
  CouncilActions.receiveQuestion(data);
  notify();
});

socket.on('question:ended', function(data) {
  CouncilActions.endQuestion(data);
});

socket.on('question:results', function(data) {
  CouncilActions.questionFinished(data);
});

var CouncilActions = Flux.createActions({
  loadQuestions: function() {
    socket.emit('load:questions', function(data) {
      CouncilActions.loaded(data);
    });
  },
  loaded: function(data) {
    return {
      actionType: 'LOAD_QUESTIONS',
      data: data
    };
  },
  receiveQuestion: function(data) {
    return {
      actionType: 'RECEIVE_QUESTION',
      data: data
    };
  },
  endQuestion: function(data) {
    return {
      actionType: 'END_QUESTION',
      data: data
    };
  },
  vote: function(data) {
    socket.emit('vote', data);
    return {
      actionType: 'VOTE_MADE',
      data: data
    };
  },
  questionFinished: function(data) {
    return {
      actionType: 'QUESTION_FINISHED',
      data: data
    };
  }
});

module.exports = CouncilActions;
