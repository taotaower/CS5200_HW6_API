const app = require('../../express');
const movieSchema = require('../models/movie/movie.schema');
const movieModel = require('../models/movie/movie.model');
const helpers = require('./helpers');

app.post('/api/movie', createMovie);

app.get('/api/movie', getMovies);
app.get('/api/movie?:predicates',);
app.get('/api/movie/:id', getMovieById);

app.put('/api/movie/:id', putMovieById);

app.delete('/api/movie/:id', deleteMovie);
app.delete('/api/movie/', deleteMovies);


function getMovies(req, res){

    movieModel.find({}).then(
        movies => {

               helpers.checkNull(movies,res);

                let newMovies = movies.map(movie => {
                    return helpers.addNullTofields(helpers.movieSchema,movie);
                });

                res.json(newMovies)


        },
        err => {
            res.send(err)
        }
    )
}

function createMovie(req,res){

    let movie = req.body;

    updateMovieSchema(movie);

    movieModel.create(movie).then(
        movie => {
            res.json(helpers.addNullTofields(helpers.movieSchema, movie))
        },
        err => {
            res.send(err)
        }
    )

}

function getMovieById(req,res){
    let id = req.params.id;

    movieModel.findOne({'id': id}).then(
        movie => {
            helpers.checkNull(movie,res);

            res.json(helpers.addNullTofields(helpers.movieSchema, movie));
        },
        err => {
            res.send(err)
        }
    )
}


function putMovieById(req,res){
    let id = req.params.id;
    let movie = req.body;

    updateMovieSchema(movie);

    movieModel.findOneAndUpdate({id:id}, movie).then(
        movie => {
            helpers.checkNull(movie,res);

            return movieModel.findOne({id:id});
        },
        err => {
            res.send(err)
        }
    ).then(
        movie => {
            helpers.checkNull(movie,res);

            res.json(helpers.addNullTofields(helpers.movieSchema, movie));
        },
        err =>{
            res.send(err)
        }
    )
}

function deleteMovie(req,res){
    let id = req.params.id;

    movieModel.findOneAndRemove({id:id}).then(
        movie => {
            helpers.checkNull(movie,res);

            res.json("successfully delete");
        }, err => {
            res.send(err)
        }
    )
}

function deleteMovies(req,res){

    movieModel.remove({}).then(
        msg => {
            res.json("successfully delete all");
        },
        err => {
            res.send(err)
        }
    )
}

function updateMovieSchema(movie){
    let movieFields= Object.keys(movie);

    let newSchema = {};

    movieFields.forEach(
        filed =>
        {
            newSchema[filed] = 'string';
            helpers.movieSchema[filed] = null;
        }
    );

    movieSchema.add(newSchema);
}
