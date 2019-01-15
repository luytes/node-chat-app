var socket = io();

socket.on('connect', function () {
  console.log("Connected to server ");
  // EMIT EVENT
  // socket.emit('createMessage', {
  //   from: 'Kevin',
  //   text: 'Hey Lisa!'
  // });
});

socket.on('disconnect', function () {
  console.log("Disconnected from server ");
});
// LISTENER
socket.on('newMessage', function (message) {
  console.log('NewMessage', message);
  var li = jQuery('<li><li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Kevin',
//   text: 'Testing things, hi!'
// }, function (data) { // 'this is from the server'
//   console.log('Got it', data);
// });

jQuery('#message-from').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
