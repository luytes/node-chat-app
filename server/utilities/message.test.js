var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Kevin';
    var text = 'Some text';
    var message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from: from,
      text: text
    })
  })
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Kevin';
    var latitude = 15;
    var longitude = 12;
    var url = 'https://www.google.com/maps?q=15,12'
    var message = generateLocationMessage(from, latitude, longitude);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from: from,
      url: url
    })
  })
});
