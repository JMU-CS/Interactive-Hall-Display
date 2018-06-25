// Import modules
var express = require('express');
var path = require('path');

// Initialize the application and socket IO connections
var app = express();

// Import game file here. 

app.use(express.static('framework'));
  

var server = require('http').createServer(app).listen(process.env.PORT || 8080);

// Create the Socket.IO server and attach it to the HTTP server
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    // socket logic here.
});
