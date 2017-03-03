
"use strict";

//module dependencies.
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var port = 3000;

// location of static files
app.use(express.static('dist'))

// remove expressjs from response
app.disable('x-powered-by');

// begin listening
app.listen(port, function () {
  console.log('Static server listening on port ' + port);
});