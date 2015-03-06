'use strict';

var Flux = require('../Flux');

var CouncilStore = Flux.createStore({
  openQuestions: [],
  currentQuestion: {},
  loadQuestions: function(data) {
    CouncilStore.openQuestions = data.sort(function(a, b) {
      return a.start - b.start;
    });
    CouncilStore.currentQuestion = CouncilStore.openQuestions[0];
  },
  getQuestions: function() {
    return CouncilStore.openQuestions;
  },
  getCurrent: function() {
    return CouncilStore.currentQuestion;
  },
  receiveQuestion: function(data) {
    CouncilStore.openQuestions = CouncilStore.openQuestions.push(data).sort(function(a, b) {
      return a.start - b.start;
    });
  },
  endQuestion: function(data) {
    CouncilStore.openQuestions.forEach(function(question, index) {
      if (question._id == data._id) {
        CouncilStore.openQuestions.splice(index, 1);
      }
    });
    CouncilStore.currentQuestion = CouncilStore.openQuestions[0];
  },
  vote: function(data) {
    CouncilStore.openQuestions.splice(data);
    CouncilStore.currentQuestion = CouncilStore.openQuestions[0];
  },
  questionPicked: function() {}
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
