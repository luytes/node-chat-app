var socket = io();

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child'); // list items that are the last child
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight(); // previous child
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  };
};

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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html(); // html returns the markup inside message-template which is the paragraph <p>
  // the thing we add to browser
  var html = Mustache.render(template, { // set it to mustache call, takes template we wanna render
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html); // renders it
  // console.log('NewMessage', message);
  // var li = jQuery('<li><li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  // console.log('NewLocationMessage', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, { // set it to mustache call, takes template we wanna render
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html); // renders it
  // var li = jQuery('<li><li>');
  // var a = jQuery('<a target="_blank">My current location<a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
  scrollToBottom();
});

// socket.emit('createMessage', {
//   from: 'Kevin',
//   text: 'Testing things, hi!'
// }, function (data) { // 'this is from the server'
//   console.log('Got it', data);
// });

jQuery('#message-from').on('submit', function (e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geoocation not supported by your browser'); // you can use bootstrap here, implement tools here
  }
  locationButton.attr('disabled', 'disabled').text('Sending Location...'); // disable button
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
})
