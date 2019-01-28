const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  // -- seeding --
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Lisa',
      room: 'Room 1'
    }, {
      id: '2',
      name: 'Felix',
      room: 'Room 2'
    }, {
      id: '3',
      name: 'Yume',
      room: 'Room 1'
    }]
  });
  // -- seeding --
  // Test addUser
  it('should add new user', () => {
    var users = new Users(); // <-- This is users class!
    var user = {
      id: '123',
      name: 'Kevin',
      room: 'The Dark Side'
    };
    var responseUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]); // first users is the var here, the second one acceses the users array
  });
  // Test removeUser
  it('should remove a User', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  it('should not remove a User', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });
  // Test getUser
  it('should find User', () => {
    var userId = '1';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  it('should not find User', () => {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  });
  // Test getUserList
  it('should return names for Room 1', () => {
    var userList = users.getUserList('Room 1');
    expect(userList).toEqual(['Lisa', 'Yume']);
  });
  it('should return names for Room 2', () => {
    var userList = users.getUserList('Room 2');
    expect(userList).toEqual(['Felix']);
  });
});
