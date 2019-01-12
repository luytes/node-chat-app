const path = require('path'); // build in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // this "io" is our server!

app.use(express.static(publicPath));
io.on('connection', (socket) => { // server and client keep chanel for as long as client want to
  console.log('New user connected');
  // EMIT EVENTS
  socket.emit('newMessage', {
    from: 'Kevin',
    text: 'Hey whats up',
    createdAt: 123
  });

  socket.on('createMessage', (message) => { // this callback is the listener
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log("User was disconnected")
  });
});
server.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});


