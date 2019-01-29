// const bootstrap = require('bootstrap');
const path = require('path'); // build in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utilities/message');
const {isRealString} = require('./utilities/validation');
const {Users} = require('./utilities/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // this "io" is our server!
var users = new Users(); // now able to call all of user methods (add, remove get etc)

app.use(express.static(publicPath));
io.on('connection', (socket) => { // server and client keep chanel for as long as client want to
  console.log('New user connected');

  // EMIT EVENTS
  // socket.emit('newMessage', { // emits to a single connection
  //   from: 'Kevin',
  //   text: 'Hey whats up',
  //   createdAt: 123
  // });

  socket.on('join', (params, callback) => {
    // validate data (name and room)
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('name and room name are required!');
    }
    // emit chat messages to other people also in the room
    socket.join(params.room);
    // if you wanna leave a room -> socket.leave(params.room);
    // io emit, emit to every single connected user
    // in order to send to specific room, use to method -> io.to(params.room - room name).emit
    // socket.broadcast -> sends message to everyone connected in socket.server except the person who emits it
    users.removeUser(socket.id); // if user joins the room, we remove them from previous rooms and add to new room
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // socket.emit from admin to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
    // socket.broadcast.emit from admin to text new user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
    callback();
  });

  socket.on('createMessage', (message, callback) => { // this callback is the listener
    console.log('createMessage', message);
    // emits to every single connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback(); // server gets data back
  });

  socket.on('createLocationMessage', (coordinates) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coordinates.latitude, coordinates.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('Update User List', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});
server.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});


