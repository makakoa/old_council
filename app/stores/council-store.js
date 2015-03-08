'use strict';

var Flux = require('../Flux');

var CouncilStore = Flux.createStore({
  openQuestions: [],
  loadQuestions: function(data) {
    CouncilStore.openQuestions = [];
    for (var question in data) {
      CouncilStore.openQuestions.push(data[question]);
    }
  },
  getQuestions: function() {
    return CouncilStore.openQuestions;
  },
  receiveQuestion: function(data) {
    CouncilStore.openQuestions.push(data);
  },
  endQuestion: function(data) {
    CouncilStore.openQuestions.forEach(function(question, index) {
      if (question._id == data._id) {
        CouncilStore.openQuestions.splice(index, 1);
      }
    });
  },
  vote: function(data) {
    CouncilStore.openQuestions.splice(data.question, 1);
  }
}, function(payload) {
  switch (payload.actionType) {
    case 'LOAD_QUESTIONS':
      CouncilStore.loadQuestions(payload.data);
      CouncilStore.emitChange();
      break;
    case 'RECEIVE_QUESTION':
      CouncilStore.receiveQuestion(payload.data);
      CouncilStore.emitChange();
      break;
    case 'END_QUESTION':
      CouncilStore.endQuestion(payload.data);
      CouncilStore.emitChange();
      break;
    case 'VOTE_MADE':
      CouncilStore.vote(payload.data);
      CouncilStore.emitChange();
      break;
  }
});

module.exports = CouncilStore;
