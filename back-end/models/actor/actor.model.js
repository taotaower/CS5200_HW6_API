const mongoose = require('mongoose');
const actorSchema = require('./actor.schema');
const actorModel = mongoose.model('ActorModel', actorSchema);






module.exports = actorModel;