var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/public/home.html"));
});

app.get('/data', (req, res) => {
  const location = path.join(__dirname + "/data");
  fs.readdir(location, (err, files) => {
    if(err) {
      return "error";
    }

    res.json(files);

  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.send(err.status);
});

module.exports = app;
