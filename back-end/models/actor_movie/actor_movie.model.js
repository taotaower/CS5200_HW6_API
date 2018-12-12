const mongoose = require('mongoose');
const actorMovieSchema = require('./actor_movie.schema');
const actorMovieModel = mongoose.model('ActorMovieModel', actorMovieSchema);






module.exports = actorMovieModel;