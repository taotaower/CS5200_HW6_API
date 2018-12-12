const mongoose = require('mongoose');


let actorSchema = mongoose.Schema({
    id : {type: String, unique: true},

}, {collection: "actor"});


module.exports = actorSchema;