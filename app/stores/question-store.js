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
    console.log('Store: create question');
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
    QuestionStore.storeQuestion.options[data.index] = data.value;
    console.log('Store: update option ' + data.index + ' as ' + data.value);
  },
  deleteOption: function(data) {
    QuestionStore.storeQuestion.options.splice(data, 1);
    console.log('Store: delete option ' + data);
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
    case 'QUESTION_ANSWERED':
      QuestionStore.questionAnswered(payload.data);
      QuestionStore.emitChange();
      break;
  }
});

module.exports = QuestionStore;
