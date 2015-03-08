'use strict';

var Flux = require('../Flux');

var QuestionStore = Flux.createStore({
  storeQuestion: {},
  results: {},
  getQuestion: function() {
    return QuestionStore.storeQuestion;
  },
  getResults: function() {
    return QuestionStore.results;
  },
  createQuestion: function(data) {
    QuestionStore.storeQuestion = data;
  },
  updatePrompt: function(data) {
    QuestionStore.storeQuestion.prompt = data.value;
  },
  createOption: function(data) {
    QuestionStore.storeQuestion.options.push({option: ''});
  },
  updateOption: function(data) {
    QuestionStore.storeQuestion.options[data.index].option = data.value;
  },
  deleteOption: function(data) {
    QuestionStore.storeQuestion.options.splice(data, 1);
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
