const mongoose = require('mongoose');


let actorMovieSchema = mongoose.Schema({

    actor_id: String,
    movie_id: String,

}, {collection: "actorMovie"});


module.exports = actorMovieSchema;