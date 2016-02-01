var config  = require('../../config');
var express = require('express');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    // Route to Check if everything works
    // accessed at GET http://localhost:8080/api
    apiRouter.get('/', function(req, res) {
        res.json({ message: 'Welcome to our API!' });
    });
    
    return apiRouter;
};
// Testing
