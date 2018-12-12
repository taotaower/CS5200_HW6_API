const mongoose = require('mongoose');

let connectionString = 'mongodb://localhost/hw6'; // for local


if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    let username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    let password = process.env.MLAB_PASSWORD_WEBDEV;

    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds117250.mlab.com:17250/heroku_rbdgfw80';
}

mongoose.connect(connectionString);


require('./services/actor.service');
require('./services/actor_movie.service');
require('./services/movie.service');