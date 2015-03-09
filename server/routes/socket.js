'use strict';

var userCount = 0;
var councilSize = 0;
var open = {};
var recent = [{}, {}, {}, {}, {}];

//auto populate for dev
open = {
  suchunique: {
    start: Date.now() - 29000,
    time: 30000,
    prompt: 'What is life?',
    options: [{option: 'a game', votes: 0}, {option: 'a mystery', votes: 0}, {option: 'the matrix', votes: 0}],
    total: 0,
    _id: 'suchunique'
  },
  suchunique2: {
    start: Date.now() - 28000,
    time: 30000,
    prompt: 'How many fingers am I holding up?',
    options: [{option: 'one', votes: 0}, {option: 'four', votes: 0}, {option: 'twelve', votes: 0}],
    total: 0,
    _id: 'suchunique2'
  },
  suchunique3: {
    start: Date.now() - 27000,
    time: 30000,
    prompt: 'What is The Council?',
    options: [{option: 'a game', votes: 0}, {option: 'nothing but truth', votes: 0}, {option: 'typical politics', votes: 0}],
    total: 0,
    _id: 'suchunique3'
  },
  suchunique4: {
    start: Date.now() - 26000,
    time: 30000,
    prompt: 'Why is a raven like a writing desk?',
    options: [{option: 'both have the letter e', votes: 0}, {option: 'it\'s not', votes: 0}, {option: 'why not', votes: 0}],
    total: 0,
    _id: 'suchunique4'
  },
  suchunique5: {
    start: Date.now() - 25000,
    time: 30000,
    prompt: 'What should I do?',
    options: [{option: 'ask for guidance', votes: 0}, {option: 'join the council', votes: 0}, {option: 'read about the council', votes: 0}],
    total: 0,
    _id: 'suchunique5'
  }
};

module.exports = function(io) {
  var report = function(question) {
      console.log('Socket: reporting question');
      if (open[question].total < 1) {
        console.log('flipping coin');
        var coinFlip = Math.floor(Math.random() * open[question].options.length);
        console.log(coinFlip);
        open[question].options[coinFlip].votes++;
      }

      //reformat to result
      open[question].options = open[question].options.sort(function(a, b) {
        return b.votes - a.votes;
      });
      open[question].options[0].result = 'won';
      for (var i = 1; i < open[question].options.length; i++) {
        open[question].options[i].result = 'lost';
      }

      io.to(question).emit('question:results', open[question]);
      io.to('council').emit('question:ended', open[question]);
      recent.unshift(open[question]);
      recent.pop();
      io.emit('update:recent', recent);
      delete open[question];
    };

  var checkQuestions = function() {
    if (open == {}) return;
    for (var key in open) {
      if ((Date.now() - open[key].start) > 30000) {
        report(key);
      }
    }
  };

  setInterval(checkQuestions, 500);

  var Socket = function(socket) {
    userCount++;
    io.to(socket.id).emit('recent', recent);
    io.emit('online', userCount);
    console.log('Socket: connect ' + userCount);

    socket.on('disconnect', function() {
      console.log('Socket: disconnect');
      userCount--;
      io.emit('online', userCount);
    });

    socket.on('question:submit', function(data) {
      console.log('Socket: question submitted');
      if (data.options.length < 1) return;
      if (!data.prompt) data.prompt = '*Silence*...';
      data.start = Date.now();
      io.to('council').emit('question:new', data);
      socket.join(data._id);
      data.options.forEach(function(option) {
        option.votes = 0;
      });
      data.total = 0;
      console.log('Adding: ' + JSON.stringify(data));
      open[data._id] = data;
    });

    socket.on('load:questions', function(cb) {
      console.log('Socket: council member joined');
      socket.join('council');
      councilSize++;
      cb(open);
    });

    socket.on('leave:council', function() {
      console.log('Socket: council member left');
      socket.leave('council');
      councilSize--;
    });

    socket.on('vote', function(data) {
      console.log('Socket: council member voted');
      console.log(data);
      open[data._id].total++;
      open[data._id].options[data.index].votes++;
      socket.join(data._id);
    });
  };

  return Socket;
};
