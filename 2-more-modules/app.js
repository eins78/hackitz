var url = require('url');
var $ = require('jquery');

var bigblue = require('./lib/bigblue');

var myUrl = "http://malbrech@zhdk.ch:1337/itz?foo=bar#pow";

var parsedURL = JSON.stringify(url.parse(myUrl), null, 2);

console.log(parsedURL);

if (document) {
  $('body').append($('<pre>').text(bigblue.number()));
  $('body').append($('<pre>').text(parsedURL));
}