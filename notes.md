# Modules !

node encourages small, functional components by having a dead simple
module implementation.


## simplicity wins

```js
// hello.js
var hello = function () {
  return "hello world"
}; 
module.exports = hello;

// app.js
var hello = require('./hello.js');
console.log(hello());
```

## it's just javascript!™

```js
// bigblue.js
var bb = {};
bb.number = function (data) {
  return interestingImplementation(data);
}; 
function interestingImplementation(argument) {
  return Math.floor(Math.random() * 43);
}
module.exports = bb;

// app.js
var bigblue = require('./bigblue.js');
console.log(bigblue.number() === 42);
```

# `browserify`

with `browserify` you can do that in the browser!

```
$ browserify app.js > app-browser.js
$ cat app-browser.js
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var bigblue = require('./bigblue.js');
console.log(bigblue.number() === 42);
},{"./bigblue.js":2}],2:[function(require,module,exports){
var bb = {};
bb.number = function (data) {
  return interestingImplementation(data);
}; 
function interestingImplementation(argument) {
  return Math.floor(Math.random() * 43);
}
module.exports = bb;
},{}]},{},[1])
```




# Why `React`?

- Composable, functional UI components
- Don't work with the DOM directly
- Unidirectional data flow
- Plays well with others (frontend and backend)

- unit test UI components!


# Dev process

Modularity + flexible usage = fits in any dev process

- Build component as "static" mockups (react, JSON, JSX)
- Style them (internally or externally)
- Iterate on style and UX
- Have working UI in Styleguides!

- In case fo `madek` and `leihs` it wouldn't replace
  `spine` etc, but jqUery! And it's coupling to js and templates.


## How does React work?

### "Components describe their state at any point in time"

- static html: templates describe state of markup with any data
- components extend this to dynamic UIs

### "Unidirectional data flow"

- data goes into component (properties)
- component is rendered
- "stateful": separation of props and state

### "Virtual DOM"

- components are rendered into internal JS representation ("Virtual DOM Node")
- virtual DOM-tree
- render to real DOM
- change happens: new data -> rerender
- new virtual DOM-tree
- DIFF the trees!
- calculate minimal transformations between the DOMs
  