const path = require('path'); // build in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utilities/message');


var app = express();
var server = http.createServer(app);
var io = socketIO(server); // this "io" is our server!

app.use(express.static(publicPath));
io.on('connection', (socket) => { // server and client keep chanel for as long as client want to
  console.log('New user connected');

  // EMIT EVENTS
  // socket.emit('newMessage', { // emits to a single connection
  //   from: 'Kevin',
  //   text: 'Hey whats up',
  //   createdAt: 123
  // });
  // socket.emit from admin to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
// socket.broadcast.emit from admin to text new user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined!'));

  socket.on('createMessage', (message, callback) => { // this callback is the listener
    console.log('createMessage', message);
    // emits to every single connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server'); // server gets data back
    // socket.broadcast.emit('newMessage', { // emit to everybody but this socket
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log("User was disconnected")
  });
});
server.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});


