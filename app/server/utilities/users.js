[{
  id: '18371y2noundo816db82f2pm3im',
  name: 'Kevin',
  room: 'The Dark Side'
}]

// METHODS

class Users {
  constructor () {
    this.users = [];
  }
  // addUser(id, name, room)
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user); // push user in array above
    return user; // gives user back
  }
  // removeUser(id)
  removeUser (id) {
    // return user that was removed
    var user = this.users.filter((user) => user.id === id)[0];
    if (user) {
      // filter here to find all users whose id does not match the one specified above
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  // getUser(id) - If trying to send a message
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  // getUserList(room) - Figure our which users are in that room, returns an array of names
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    // var users = this.users.filter((user) => { // filter() takes a function as argument, gets called with each user, return true to keep items in array
    //   return user.room === room; // if equal is true, they will be added to the list
    // })
    // take array of objects and convert into array of strings - use map
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};
// CLASSES - Can add constructor function, called by default
// Example:
// class Persons {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} old`
//   }
// }
// var me = new Person('Kevin', 25);
// var description = me.getUserDescription();
// console.log(description);
