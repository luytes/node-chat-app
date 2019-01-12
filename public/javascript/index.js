var socket = io();

socket.on('connect', function () {
  console.log("Connected to server ");
  // EMIT EVENT
  socket.emit('createMessage', {
    from: 'Kevin',
    text: 'Hey Lisa!'
  });
});

socket.on('disconnect', function () {
  console.log("Disconnected from server ");
});
// LISTENER
socket.on('newMessage', function (message) {
  console.log('NewMessage', message);
});
