// BASE SETUP
// ===========================================
// required package
var express     = require('express');       // call express
var app         = express();                // define our app with express
var bodyParser  = require('body-parser');   // used to see requests
var morgan      = require('morgan');        // used for logging requests
var config      = require('./config');      // easy configuration
var path        = require('path');          // track current directory
var mongoose    = require('mongoose');
var methodOverride = require('method-override');

// App Configuration
// ===========================================
// use body parser to grab info from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

// log all requests to console
app.use(morgan('dev'));

// connect to database 
// mongoose.connect(config.database);

// override with X-HTTP-Method-Override header in req. simulate Delete/Put
app.use(methodOverride('X-HTTP-Method-Override'));

// set static file location
// used for frontend requests
app.use(express.static(__dirname + '/public'));

// Routes for API
// ===========================================
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// Main Catchall Route ---------------
// Send users to Frontend -----------
// must be registered after api routes
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// Start Server
// ===========================================
app.listen(config.port);
console.log("Magic happens on port: " + config.port);

