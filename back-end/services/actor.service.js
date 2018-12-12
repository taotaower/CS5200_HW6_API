const app = require('../../express');
const actorSchema = require('../models/actor/actor.schema');
const actorModel = require('../models/actor/actor.model');
const helpers = require('./helpers');


app.post('/api/actor', createActor);

app.get('/api/actor', getActors);
app.get('/api/actor?:predicates',);
app.get('/api/actor/:id', getActorById);

app.put('/api/actor/:id', putActorById);

app.delete('/api/actor/:id', deleteActor);
app.delete('/api/actor/', deleteActors);


function getActors(req, res){

    actorModel.find({}).then(
        actors => {
                helpers.checkNull(actors,res);

                let newActors = actors.map(actor => {
                    return helpers.addNullTofields(helpers.actorSchema,actor);
                });

                res.json(newActors)


        },
        err => {
            res.send(err)
        }
    )
}

function createActor(req,res){

    let actor = req.body;

    updateActorSchema(actor);

    actorModel.create(actor).then(
        actor => {
            res.json(helpers.addNullTofields(helpers.actorSchema, actor))
        },
        err => {
            res.send(err)
        }
    )

}

function getActorById(req,res){
    let id = req.params.id;

    actorModel.findOne({'id': id}).then(
        actor => {

            helpers.checkNull(actor,res);

            res.json(helpers.addNullTofields(helpers.actorSchema, actor));
        },
        err => {
            res.send(err)
        }
    )
}


function putActorById(req,res){
    let id = req.params.id;
    let actor = req.body;

    updateActorSchema(actor);

    actorModel.findOneAndUpdate({id:id}, actor).then(
        actor => {

            helpers.checkNull(actor,res);

            return actorModel.findOne({id:id});
        },
        err => {
            res.send(err)
        }
    ).then(
        actor => {

            helpers.checkNull(actor,res);

            res.json(helpers.addNullTofields(helpers.actorSchema, actor));
        },
        err =>{
            res.send(err)
        }
    )
}

function deleteActor(req,res){
    let id = req.params.id;

    actorModel.findOneAndRemove({id:id}).then(
        actor => {

            helpers.checkNull(actor,res);

            res.json("successfully delete");
        }, err => {
            res.send(err)
    }
    )
}

function deleteActors(req,res){

    actorModel.remove({}).then(
        msg => {
            res.json("successfully delete all");
        },
        err => {
            res.send(err)
        }
    )
}

function updateActorSchema(actor){
    let actorFields= Object.keys(actor);

    let newSchema = {};

    actorFields.forEach(
        filed =>
        {
            newSchema[filed] = 'string';
            helpers.actorSchema[filed] = null;
        }
    );

    actorSchema.add(newSchema);
}
