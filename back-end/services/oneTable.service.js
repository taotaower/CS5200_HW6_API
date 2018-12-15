const app = require('../../express');
const helpers = require('./helpers');



app.post('/api/:table', createItem);

app.get('/api/:table', getItems);
app.get('/api/:table?:predicates',);
app.get('/api/:table/:id', getItemById);

app.put('/api/:table/:id', putItemById);

app.delete('/api/:table/:id', deleteItem);
app.delete('/api/:table/', deleteItems);


function getItems(req, res){

    let tableName = req.params.table;

    let tableModel = helpers.allModels[tableName];

    if (helpers.checkNotExist(tableModel)){
        res.send("null");
        return
    }


    tableModel.find({}).then(
        items => {
            helpers.checkNull(items,res);

            let newItems = items.map(item => {
                return helpers.addNullTofields(tableName,item);
            });

            res.json(newItems)

        },
        err => {
            res.send(err)
        }
    )
}

function createItem(req,res){

    let tableName = req.params.table;

    let tableModel = helpers.allModels[tableName];

    let item = req.body;
    if(helpers.checkNotExist(tableModel)){
        helpers.generateSchema(tableName);
    }

    helpers.updateTableSchema(item, tableName);

    tableModel = helpers.allModels[tableName];


    tableModel.create(item).then(
        item => {
            res.json(helpers.addNullTofields(tableName, item))
        },
        err => {
            res.send(err)
        }
    )

}

function getItemById(req,res){

    let tableName = req.params.table;

    let tableModel = helpers.allModels[tableName];

    if (helpers.checkNotExist(tableModel)){
        res.send("null");
        return
    }


    let id = req.params.id;

    tableModel.findOne({_id: id}).then(
        item => {

            helpers.checkNull(item,res);

            res.json(helpers.addNullTofields(helpers.itemSchema, item));
        },
        err => {
            res.send(err)
        }
    )
}


function putItemById(req,res){

    let tableName = req.params.table;

    let tableModel = helpers.allModels[tableName];

    if (helpers.checkNotExist(tableModel)){
        res.send("null");
        return
    }

    let id = req.params.id;
    let item = req.body;

    helpers.updateTableSchema(item,tableName);

    tableModel.findOneAndUpdate({_id:id}, item).then(
        item => {

            helpers.checkNull(item,res);

            return tableModel.findOne({_id:id});
        },
        err => {
            res.send(err)
        }
    ).then(
        item => {

            helpers.checkNull(item,res);

            res.json(helpers.addNullTofields(helpers.itemSchema, item));
        },
        err =>{
            res.send(err)
        }
    )
}

function deleteItem(req,res){

    let tableName = req.params.table;

    let tableModel = helpers.allModels[tableName];

    if (helpers.checkNotExist(tableModel)){
        res.send("null");
        return
    }

    let id = req.params.id;

    tableModel.findOneAndRemove({_id:id}).then(
        item => {

            helpers.checkNull(item,res);

            res.json("successfully delete");
        }, err => {
            res.send(err)
        }
    )
}

function deleteItems(req,res){

    let tableName = req.params.table;

    let tableModel = helpers.allModels[tableName];

    if (helpers.checkNotExist(tableModel)){
        res.send({ msg : 'table not exists, create one'});
        return
    }

    tableModel.remove({}).then(
        msg => {
            res.json("successfully delete all");
        },
        err => {
            res.send(err)
        }
    )
}

