var config = {
  "port": 2342,
  "log": true,
  "debug": true
};

var http = require('http'),
    url = require('url'),
    querystring = require('querystring');


// db module
var db = {
  fs: require('fs'),
  READ: function (path, callback) {
    this.fs.readFile('.'+path, { encoding:"utf8" }, function (err, data) {
      callback(null || err, data && data.length ? data.toString() : null);
    });
  },
  WRITE: function (path, data, callback) {
    this.fs.writeFile('.'+path, data, function (err) {
      callback(err || null);
    });
  },
  UPDATE: function (path, data, callback) {
    var db = this;
    db.READ(path, function (FsError, string) {
      
      if (FsError) { return callback(new Error("fs: "+FsError)); }
      
      try { 
        var list = JSON.parse(string); 
        list.push(data);
        
        list = list.length ? JSON.stringify(list, null, 2) : [];
        
        db.WRITE(path, list, callback);
      }
      catch (JSONerror) {
        callback(new Error("JSON: "+JSONerror));
      } 
    });
  }
};

var server = http.createServer(function (req, res) {
  
  var time = new Date().getTime().toString().slice(-5);
  var pathname = url.parse(req.url).pathname;
  var file = (pathname === "/") ? '/index.html' : pathname;
  
  console.log(time, req.method, req.url);
    
  // serve Files
  if (req.method === "GET") {

    db.READ(file, function (err, string) {
      if (err) {
        res.writeHead(404);
        return res.end("Not found! " + err + time, "utf8");
      }
      return res.end(string, "utf8");
    });
  }
  
  // "API" ;)
  else if (req.method === "POST") {

    var body = "";
    req.on('data', function (data) {
      if (body.length > 1e6) { // not bigger than 1MB!
        debug("ERROR: POST data to big! > "+time);
        res.writeHead(413); res.end();
        req.connection.destroy();
        body = null;
      }
      body += data;
    });
    
    req.on('end', function () {
      
      if (!body) {
        res.writeHead(400);
        debug("ERROR: no POST data! > "+time);
        return res.end(time);
      }
      
      // normal form data is querystring-enocoded
      var data = querystring.parse(body);
      debug(data);
      
      db.UPDATE(file, data, function (err) {
        if (err) {
          log(err);
          res.writeHead(500);
        }
        res.writeHead(201); // semi-correct
        return res.end(time);
      });
      
    });
      
  }
  
  else {
    // if we reach this, we don't know what to do
    res.writeHead(501);
    return res.end("FAIL");
  }
  
}).listen(config.port, function () {
  console.log("Listening on " + config.port);
});


// logger
var log = function () {
  if (config.log) {
    console.log.call(null, arguments[0]);
  }
},
debug = function () {
  if (config.debug) {
    log(arguments[0]);
    log(''); // linebreak
  }
};