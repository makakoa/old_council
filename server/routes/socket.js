'use strict';

var _ = require('lodash');

var userCount = 0;
var councilSize = 0;
var openQuestions = {};
var recent = [];


var sampleQuestions = [{
  start: Date.now() - 29000,
  time: 30000,
  prompt: 'What is life?',
  options: [{
    option: 'a game',
    votes: 0
  }, {
    option: 'a mystery',
    votes: 0
  }, {
    option: 'the matrix',
    votes: 0
  }],
  total: 0,
  _id: 'suchunique'
}, {
  start: Date.now() - 28000,
  time: 30000,
  prompt: 'How many fingers am I holding up?',
  options: [{
    option: 'one',
    votes: 0
  }, {
    option: 'four',
    votes: 0}, {
      option: 'twelve',
      votes: 0
    }],
  total: 0,
  _id: 'suchunique2'
}, {
  start: Date.now() - 27000,
  time: 30000,
  prompt: 'What is The Council?',
  options: [{
    option: 'a game',
    votes: 0
  }, {
    option: 'nothing but truth',
    votes: 0
  }, {
    option: 'typical politics', votes: 0
  }],
  total: 0,
  _id: 'suchunique3'
}, {
  start: Date.now() - 26000,
  time: 30000,
  prompt: 'Why is a raven like a writing desk?',
  options: [{
    option: 'both have the letter e', votes: 0
  }, {
    option: 'it\'s not', votes: 0
  }, {
    option: 'why not', votes: 0
  }],
  total: 0,
  _id: 'suchunique4'
}, {
  start: Date.now() - 25000,
  time: 30000,
  prompt: 'What should I do?',
  options: [{
    option: 'ask for guidance',
    votes: 0
  }, {
    option: 'join the council',
    votes: 0
  }, {
    option: 'read about the council',
    votes: 0
  }],
  total: 0,
  _id: 'suchunique5'
}];

module.exports = function(io, nano) {

  nano.db.create('questions');
  var questionStore = nano.db.use('questions');

  function initSocket(socket) {
    userCount++;

    getQuestions(function(qs) {
      io.to(socket.id).emit('recent', qs);
    });

    console.log('Socket: connect, Online ' + userCount);
    io.emit('online', userCount);

    socket.on('disconnect', function() {
      userCount--;
      console.log('Socket: disconnect, Online ' + userCount);
      io.emit('online', userCount);
    });

    socket.on('question:submit', function(data) {
      console.log('Socket: question submitted ' + data.prompt);
      pollQuestion(data, function(results) {
        io.to(socket.id).emit('question:results', results);
      });
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

  function pollQuestion(question) {
    if (question.options.length < 1) return;

    console.log('Question: ' + question.prompt);
    openQuestions[question._id] = question;

    question.created = Date.now();
    setTimeout(function() {
      report(question);
    }, 30000);

    io.to('council').emit('question:new', question);
  }

  function vote(v) {
    openQuestions[v._id].total++;
    openQuestions[v._id].options[v.index].votes++;
  }

  function report(question) {
    console.log('Socket: reporting question');

    if (question.total < 1) {
      var coinFlip = Math.floor(Math.random() * question.options.length);
      question.options[coinFlip].votes++;
    }

    //reformat to result
    question.options = question.options.sort(function(a, b) {
      return b.votes - a.votes;
    });
    _.first(question.options).result = 'won';
    _.map(_.rest(question.options), function(o) {
      o.result = 'lost';
    });

    questionStore.insert(question, function() {
      getQuestions(function(qs) {
        io.emit('update:recent', qs);
      });
    });
    delete openQuestions[question._id];
  }


  function getQuestions(cb) {
    var questions = [];
    var complete = 0;

    questionStore.list(function(err, body) {
      if (err) return;

      function checkComplete() {
        if (complete === body.rows.length) {
          console.log("ALL QUESTIONS", questions);
          cb(questions);
        }
      }

      _.map(body.rows, function(q) {
        questionStore.get(q.id, function(err, body) {
          if (err) return;
          questions.push(body);
          complete++;
          checkComplete();
        });
      });
    });
  }

  return initSocket;
};
