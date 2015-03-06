'use strict';

var userCount = 0;
var councilSize = 0;
var openQuestions = {};

var checkQuestions = function() {
  if (openQuestions.length < 1) return;
  openQuestions.forEach(function(question) {
    if ((Date.now() - question.start) > 30000) {
      Socket.report(question);
      delete openQuestions[question._id];
    }
  });
};
setInterval(checkQuestions, 500);

var Socket = function(socket) {
  userCount++;
  socket.broadcast.emit('online', userCount);
  console.log('Socket: connect');

  socket.on('disconnect', function() {
    console.log('Socket: disconnect');
    userCount--;
    socket.broadcast.emit('online', userCount);
  });

  socket.on('question:submit', function(data) {
    console.log('Socket: question submitted');
    data.start = Date.now();
    socket.to('council').emit('question', data);
    socket.join(data._id);
    data.options.forEach(function(option) {
      option.votes = 0;
    });
    openQuestions[data._id] = data;
  });

  this.report = function(question) {
    console.log('Socket: reporting question');
    if (votes < 1) {
      console.log('no votes');
    }
    socket.to(question._id).emit('results', question);
  };

  socket.on('join:council', function() {
    console.log('Socket: council member joined');
    socket.join('council');
    councilSize++;
  });

  socket.on('leave:council', function() {
    console.log('Socket: council member left');
    socket.join('council');
    councilSize--;
  });

  socket.on('vote', function(data) {
    console.log('Socket: council member voted');
    openQuestions[data._id].options[data.index].votes++;
    socket.join(data._id);
  });
};

module.exports = Socket;
