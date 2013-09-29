  
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , connect = require('connect')
  , fs = require('fs')
  , async = require('async');
               

var app = express();

var  dbURL = 'mongodb://85.118.135.59/database';
//var  dbURL = 'mongodb://localhost';
var db = require('mongoose').connect(dbURL);

var MemStore = connect.session.MemoryStore; 
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY', store: new MemStore({reapInterval: 60000 * 10 })}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/index')(app);
require('./routes/aboutMe')(app)
require('./routes/contactForm')(app);
require('./routes/portfolio')(app);
require('./routes/administration')(app);
require('./routes/user')(app);
require('./routes/sessions')(app);
require('./routes/activities')(app);
require('./routes/search')(app);
require('./routes/blog')(app);
require('./routes/serverLivebookingCom')(app);
require('./routes/abra')(app);
                                    

http.createServer(app).listen(80, function(){
  console.log('Express server listening on port ' + 80);
});
