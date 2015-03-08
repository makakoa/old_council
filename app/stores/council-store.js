'use strict';

var Flux = require('../Flux');

var CouncilStore = Flux.createStore({
  openQuestions: [],
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
  receiveQuestion: function(data) {
    CouncilStore.openQuestions.push(data);
  },
  endQuestion: function(data) {
    console.log(this.openQuestions);
    console.log(CouncilStore.openQuestions);
    CouncilStore.openQuestions.forEach(function(question, index) {
      if (question._id == data._id) {
        CouncilStore.openQuestions.splice(index, 1);
      }
    });
  },
  vote: function(data) {
    CouncilStore.openQuestions.splice(data.question, 1);
    console.log('removed ' + data.question);
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
