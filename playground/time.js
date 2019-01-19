// install moment npm for timespamps
var moment = require('moment');
// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());
// var date = moment();
// date.add(1, 'years').subtract(9, 'months'); // adds one year to today and subtracts 9 months
// // console.log(date.format()); // returns 2019-01-19T23:06:54+01:00
// // console.log(date.format('MMM YYYY')) // returns JAN 2019
// console.log(date.format('MMM Do, YYYY')) // returns Jan 19th, 2019
var date = moment();
console.log(date.format('h:mm a'));
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
