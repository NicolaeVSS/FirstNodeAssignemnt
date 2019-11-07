var bodyParser = require('body-parser') // parses json
var express = require('express'); // create a server and define rest endpoints
var app = express(); // constructor for express, get the "main app"

// parse application/x-www-form-urlencoded
// encode and decode URL, since its ascii only- special chars will not work unencoded
app.use(bodyParser.urlencoded({ extended: false }));

// allow cross-origin. client app and server apps arent in the same domain/subdomain- cannot allow response/request, 
// enabled for development, ALWAYS REMOVE IN PRODUCTION
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// specify parse using application/json
app.use(bodyParser.json());

// define routes to controllers, where our endpoints lie, new controllers must be manually added
app.use(require('./controllers/bookController'));

app.use(require('./controllers/authorController'));

// start server on localhost 3000
app.listen(3000);
console.log('Server running in port: 3000 ...')