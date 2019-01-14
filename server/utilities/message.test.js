var expect = require('expect');
var {generateMessage} = require('./message');

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
