const app = require('../../express');
const helpers = require('./helpers');

app.post('/api/actor/:actor_id/movie/:movie_id', createRelation);
app.post('/api/movie/:movie_id/actor/:actor_id', createRelation);

app.get('/api/movie/:id/actor', getActorByMovie);
app.get('/api/actor/:id/movie', getMovieByActor);

app.get('/api/actor/:id/movie?:predicates',);
app.get('/api/movie/:id/actor?:predicates',);


app.delete('/api/actor/:actor_id/movie/:movie_id', deleteRelation);
app.delete('/api/movie/:movie_id/actor/:actor_id', deleteRelation);


app.delete('/api/movie/:movie_id/actor', deleteRelationByMovie);
app.delete('/api/actor/:actor_id/movie', deleteRelationByActor);


function createRelation(req,res){
    let actor_id = req.params.actor_id;
    let movie_id = req.params.movie_id;

    actorMovieModel.create({
        actor_id: actor_id,
        movie_id: movie_id
    }).then(
        rel => {
            res.json(rel);
        },
        err => {
            res.send(err);
        }
    )
}

function deleteRelation(req,res){
    let actor_id = req.params.actor_id;
    let movie_id = req.params.movie_id;

    actorMovieModel.remove({
        actor_id: actor_id,
        movie_id: movie_id
    }).then(msg => {

            res.json('delete relation successfully');
        },
        err => {
        res.send(err);
        }
    )
}

function deleteRelationByActor(req,res) {

    let actor_id = req.params.actor_id;

    actorMovieModel.remove({
        actor_id: actor_id,

    }).then(msg => {
            res.json('delete relation successfully');
        },
        err => {
            res.send(err);
        }
    )
}

function deleteRelationByMovie(req,res) {

    let movie_id = req.params.movie_id;

    actorMovieModel.remove({
        movie_id: movie_id,

    }).then(msg => {
            res.json('delete relation successfully');
        },
        err => {
            res.send(err);
        }
    )
}

function getActorByMovie(req,res) {
    let movie_id = req.params.movie_id;

    actorMovieModel.find({movie_id: movie_id}).then(
        rels => {

            helpers.checkNull(rels,res);

            let actors = rels.map(
                rel => {
                    return rel._doc.actor_id;
                }
            );
            return actorModel.find({id: {$in: actors}})
        },
        err =>{
            res.send(err);
        }
    ).then(
        actors => {
            helpers.checkNull(actors,res);

            let newActors = actors.map(actor => {
                return helpers.addNullTofields(helpers.actorSchema, actor);
            });

            res.json(newActors)

        },
        err => {
            res.send(err);
        }

    )
}

function getMovieByActor(req,res){
    let actor_id = req.params.actor_id;

    actorMovieModel.find({actor_id: actor_id}).then(
        rels => {

            helpers.checkNull(rels,res);

            let movies = rels.map(
                rel => {
                    return rel._doc.movie_id;
                }
            );

            return movieModel.find({id: {$in: movies}})
        },
        err =>{
            res.send(err);
        }
    ).then(
        movies => {
            helpers.checkNull(movies,res);

            let newMovies = movies.map(movie => {
                return helpers.addNullTofields(helpers.movieSchema,movie);
            });

            res.json(newMovies)

        },
        err => {
            res.send(err);
        }

    )

}

