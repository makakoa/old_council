'use strict';

var _ = require('lodash');

var userCount = 0;
var councilSize = 0;
var openQuestions = {};

module.exports = function(io, questionStore) {

  function initSocket(socket) {
    userCount++;

    getQuestions(function(qs) {
      io.to(socket.id).emit('recent', qs);
    });

    console.log('Socket: connect, Online ' + userCount);
    // io.emit('online', userCount);

    socket.on('disconnect', function() {
      userCount--;
      console.log('Socket: disconnect, Online ' + userCount);
      io.emit('online', userCount);
    });

    socket.on('question:submit', function(data) {
      console.log('Socket: question submitted ' + data.prompt);
      pollQuestion(data, socket.id);
    });

    socket.on('load:questions', function(cb) {
      console.log('Socket: council member joined');
      socket.join('council');
      councilSize++;
      cb(openQuestions);
    });

    socket.on('leave:council', function() {
      console.log('Socket: council member left');
      socket.leave('council');
      councilSize--;
    });

    socket.on('vote', function(data) {
      console.log('Socket: Vote Q:' + data._id + ' A:' + data.index);
      vote(data);
    });
  }

  function pollQuestion(question, askerId) {
    if (question.options.length < 1) return;

    console.log('Question: ' + question.prompt);
    question.options.map(function(o) {
      o.votes = 0;
    });
    question.total = 0;
    openQuestions[question._id] = question;

    question.created = Date.now();
    setTimeout(function() {
      report(question, askerId);
    }, 30000);

    io.to('council').emit('question:new', question);
  }

  function vote(v) {
    openQuestions[v._id].total++;
    openQuestions[v._id].options[v.index].votes++;
  }

  function report(question, askerId) {
    console.log('Socket: reporting question');
    if (question.total < 1) {
      var coinFlip = Math.floor(Math.random() * question.options.length);
      question.options[coinFlip].votes++;
    }


    //reformat to result
    question.options = question.options.sort(function(a, b) {
      return b.votes - a.votes;
    });
    _.map(question.options, function(o) {
      o.result = 'lost';
    });
    _.first(question.options).result = 'won';
    console.log(question);
    io.to(askerId).emit('question:results', question);

    questionStore.insert(question).then(function() {
      getQuestions(function(qs) {
        io.emit('update:recent', qs);
      });
    });
    delete openQuestions[question._id];
  }


  function getQuestions(cb) {
    questionStore.find({}).then(cb);
  }

  return initSocket;
};
