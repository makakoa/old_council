'use strict';

var Flux = require('../Flux');

var CouncilStore = Flux.createStore({
  openQuestions: [],
  currentQuestion: {},
  loadQuestions: function(data) {
    console.log('questions loaded');
    CouncilStore.openQuestions = [];
    for (var question in data) {
      CouncilStore.openQuestions.push(data[question]);
    }
  },
  getQuestions: function() {
    console.log('Updating: questions: ' + CouncilStore.openQuestions.length);
    return CouncilStore.openQuestions;
  },
  getCurrent: function() {
    console.log('Updating: question');
    if (!CouncilStore.currentQuestion || !CouncilStore.currentQuestion._id) {
      CouncilStore.currentQuestion = CouncilStore.openQuestions[0];
    }
    console.log('Store: ' + JSON.stringify(this.currentQuestion));
    return CouncilStore.currentQuestion;
  },
  receiveQuestion: function(data) {
    CouncilStore.openQuestions.push(data);
  },
  endQuestion: function(data) {
    console.log(this.openQuestions);
    console.log(CouncilStore.openQuestions);
    console.log(CouncilStore.currentQuestion);
    CouncilStore.openQuestions.forEach(function(question, index) {
      if (question._id == data._id) {
        CouncilStore.openQuestions.splice(index, 1);
      }
    });
    if (CouncilStore.currentQuestion._id == data._id) {
      CouncilStore.currentQuestion = {};
    }
  },
  vote: function(data) {
    CouncilStore.openQuestions.splice(data);
    CouncilStore.currentQuestion = {};
  }
}, function(payload) {
  switch (payload.actionType) {
    case 'LOAD_QUESTIONS':
      console.log('Store: questions loaded');
      CouncilStore.loadQuestions(payload.data);
      CouncilStore.emitChange();
      break;
    case 'RECEIVE_QUESTION':
      console.log('Store: question received');
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
