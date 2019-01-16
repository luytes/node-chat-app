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

socket.on('newLocationMessage', function (message) {
  // console.log('NewLocationMessage', message);
  var li = jQuery('<li><li>');
  var a = jQuery('<a target="_blank">My current location<a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geoocation not supported by your browser'); // you can use bootstrap here, implement tools here
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  });
})
