const mongoose = require('mongoose');


let movieSchema = mongoose.Schema({
    id : {type: String, unique: true},

}, {collection: "movie"});


module.exports = movieSchema;