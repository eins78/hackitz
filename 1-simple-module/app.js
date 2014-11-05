var bigblue = require('./lib/bigblue.js');

// get `number` from function in modules
var number = bigblue.number();

// do stuff with `number`
if (number === 42) {
  document.body.style.background = 'hsl(88, 67%, 60%)';
}
document.getElementById('number')
  .innerHTML = (number === 42).toString() + ' ('+number+')';
