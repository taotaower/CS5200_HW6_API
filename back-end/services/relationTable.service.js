const app = require('../../express');
const helpers = require('./helpers');

app.post('/api/:table1/:item1_id/:table2/:item2_id', createRelation);

app.get('/api/:table1/:id/:table2', getTable2ByTable1);

app.get('/api/:table1/:id/:table2?:predicates',);

app.delete('/api/:table1/:item1_id/table2/:item2_id', deleteRelation);

app.delete('/api/:table1/:item1_id/:table2', deleteRelationByTable1);


function createRelation(req,res){

    let {table1, item1_id, table2, item2_id} = req.params;

    let model = null;
    let relationModelName = table1 + '_' + table2;
    let relationModelReversedName = table2 + '_' + table1;

    let relationModel = helpers.relationModels[relationModelName];
    let relationReversedModel = helpers.relationModels[relationModelReversedName];

    if (!helpers.checkNotExist(relationModel)){

        model = relationModel;

    }else if(!helpers.checkNotExist(relationReversedModel)){

        model = relationReversedModel;

    }else{

        helpers.generateRelationSchema(table1,table2);
        model =  helpers.relationModels[relationModelName];
    }

    model.create({
        [table1]: item1_id,
        [table2]: item2_id
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

    let {table1, item1_id, table2, item2_id} = req.params;

    let model = null;

    let relationModelName = table1 + '_' + table2;
    let relationModelReversedName = table2 + '_' + table1;

    let relationModel = helpers.relationModels[relationModelName];
    let relationReversedModel = helpers.relationModels[relationModelReversedName];

    if (!helpers.checkNotExist(relationModel)){

        model = relationModel;

    }else if(!helpers.checkNotExist(relationReversedModel)){

        model = relationReversedModel;

    }else{

        res.json('relation is not existed');
        return;
    }

    model.remove({
        table1: item1_id,
        table2: item2_id,
    }).then(msg => {

            res.json('delete relation successfully');
        },
        err => {
            res.send(err);
        }
    )
}

function deleteRelationByTable1(req,res) {


    let {table1, item1_id, table2} = req.params;

    let model = null;

    let relationModelName = table1 + '_' + table2;
    let relationModelReversedName = table2 + '_' + table1;

    let relationModel = helpers.relationModels[relationModelName];
    let relationReversedModel = helpers.relationModels[relationModelReversedName];

    if (!helpers.checkNotExist(relationModel)){

        model = relationModel;

    }else if(!helpers.checkNotExist(relationReversedModel)){

        model = relationReversedModel;

    }else{

        res.json('relation is not existed');
        return;
    }


    model.remove({
        table1: item1_id,

    }).then(msg => {
            res.json('delete relation successfully');
        },
        err => {
            res.send(err);
        }
    )
}


function getTable2ByTable1(req,res){

    let {table1, item1_id, table2} = req.params;

    let model = null;

    let relationModelName = table1 + '_' + table2;
    let relationModelReversedName = table2 + '_' + table1;

    let relationModel = helpers.relationModels[relationModelName];
    let relationReversedModel = helpers.relationModels[relationModelReversedName];

    if (!helpers.checkNotExist(relationModel)){

        model = relationModel;

    }else if(!helpers.checkNotExist(relationReversedModel)){

        model = relationReversedModel;

    }else{

        res.json('relation is not existed');
        return;
    }

    model.find({table1: item1_id}).then(
        rels => {
            helpers.checkNull(rels,res);

            let item2s = rels.map(
                rel => {
                    return rel._doc[table2];
                }
            );
            console.log("item2s", item2s);

            let table2Model = helpers.allModels[table2];

            return table2Model.find({id: {$in: item2s}})
        },
        err =>{
            res.send(err);
        }
    ).then(
        item2s => {
            helpers.checkNull(item2s,res);

            let newTable2s = item2s.map(item2 => {
                return helpers.addNullTofields(helpers.allSchemaFields[table2],item2);
            });

            res.json(newTable2s)

        },
        err => {
            res.send(err);
        }

    )

}

