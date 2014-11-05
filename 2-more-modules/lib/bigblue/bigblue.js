var bb = {};

bb.number = function (data) {
  return interestingImplementation(data);
}; 

function interestingImplementation(argument) {
  return Math.floor(Math.random() * 43);
}

module.exports = bb;