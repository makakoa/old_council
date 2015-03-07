'use strict';

var Flux = require('../Flux');

var QuestionStore = Flux.createStore({
  storeQuestion: {},
  results: {},
  getQuestion: function() {
    return QuestionStore.storeQuestion;
  },
  getResults: function() {
    console.log(QuestionStore.results.options);
    QuestionStore.results.options = QuestionStore.results.options.sort(function(a, b) {
      return b.votes - a.votes;
    });
    QuestionStore.results.options[0].result = 'won';
    for (var i = 1; i < QuestionStore.results.options.length; i++) {
      QuestionStore.results.options[i].result = 'lost';
    }
    return QuestionStore.results;
  },
  createQuestion: function(data) {
    QuestionStore.storeQuestion = data;
    console.log('Store: create question ' + data.options);
  },
  updatePrompt: function(data) {
    QuestionStore.storeQuestion.prompt = data.value;
    console.log('Store: update prompt');
  },
  createOption: function(data) {
    QuestionStore.storeQuestion.options.push({option: ''});
    console.log('Store: create option ' + data);
  },
  updateOption: function(data) {
    QuestionStore.storeQuestion.options[data.index].option = data.value;
    console.log('Store: update option ' + data.index + ' as ' + data.value);
  },
  deleteOption: function(data) {
    QuestionStore.storeQuestion.options.splice(data, 1);
    console.log('Store: delete option ' + data);
  },
  questionAsked: function() {
    QuestionStore.results = {};
  },
  questionAnswered: function(data) {
    QuestionStore.results = data;
  }
}, function(payload) {
  switch (payload.actionType) {
    case 'QUESTION_CREATED':
      QuestionStore.createQuestion(payload.data);
      QuestionStore.emitChange();
      break;
    case 'PROMPT_UPDATED':
      QuestionStore.updatePrompt(payload.data);
      QuestionStore.emitChange();
      break;
    case 'OPTION_CREATED':
      QuestionStore.createOption(payload.data);
      QuestionStore.emitChange();
      break;
    case 'OPTION_UPDATED':
      QuestionStore.updateOption(payload.data);
      QuestionStore.emitChange();
      break;
    case 'OPTION_DELETED':
      QuestionStore.deleteOption(payload.data);
      QuestionStore.emitChange();
      break;
    case 'QUESTION_ASKED':
      QuestionStore.questionAsked(payload.data);
      QuestionStore.emitChange();
      break;
    case 'QUESTION_ANSWERED':
      QuestionStore.questionAnswered(payload.data);
      QuestionStore.emitChange();
      break;
  }
});

module.exports = QuestionStore;
