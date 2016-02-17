var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var moment = require('moment');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moongose = require('mongoose');
require('./models/Posts');
require('./models/Comments');
require('./models/Users');
require('./models/Folders');
require('./models/Files');
require('./models/Fotosfiles');
require('./models/Fotos');
require('./models/Formularios');
require('./models/Preguntas');
require('./models/Conectados');
require('./models/Conversations');
require('./models/Respuestas');
require('./config/passport');
moongose.connect('mongodb://localhost/news');
var passport = require('passport');
var routes = require('./routes/index');
var users = require('./routes/users');
var multer  = require('multer');


var app = express();
app.io = require('socket.io')();
require('./sockets/chat')(app.io);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', routes);
app.use('/users', users);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function findClientsSocket(roomId, namespace) {
  var res = []
      , ns = app.io.of(namespace ||"/");    // the default namespace is "/"

  if (ns) {
    for (var id in ns.connected) {
      if(roomId) {
        var index = ns.connected[id].rooms.indexOf(roomId) ;
        if(index !== -1) {
          res.push(ns.connected[id]);
        }
      } else {
        res.push(ns.connected[id]);
      }
    }
  }
  return res;
}



module.exports = app;
