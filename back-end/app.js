const mongoose = require('mongoose');

let connectionString = 'mongodb://localhost/hw6'; // for local


if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    let username = process.env.MLAB_USERNAME_HW6; // get from environment
    let password = process.env.MLAB_PASSWORD_HW6;

    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds131954.mlab.com:31954/heroku_lj85h62m';
}

// mongodb://<dbuser>:<dbpassword>@ds131954.mlab.com:31954/heroku_lj85h62m

mongoose.connect(connectionString);


require('./services/actor.service');
require('./services/actor_movie.service');
require('./services/movie.service');