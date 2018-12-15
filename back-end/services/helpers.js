const mongoose = require('mongoose');


/**
 *
 * @type {{
 *     tableName: schema
 * }}
 */
const allSchemas ={

};

const allSchemaFields = {

};

const allModels ={

};


const allRelationSchemas ={

};


const relationModels ={

};



// input is a string of table name
function generateSchema(tableName){

    allSchemas[tableName] = mongoose.Schema({
    },{collection: tableName});

    allModels[tableName] = mongoose.model(tableName + 'Model', allSchemas[tableName]);

    allSchemaFields[tableName] = {}

}


function generateRelationSchema(table1, table2){

    let tableName = table1 + '_' + table2;

    allRelationSchemas[tableName] = mongoose.Schema({
        table1: {type: mongoose.Schema.ObjectId, ref: table1 + "Model"},
        table2: {type: mongoose.Schema.ObjectId, ref: table2 + "Model"},
    },{collection: tableName});

    relationModels[tableName] = mongoose.model(tableName + 'Model', allRelationSchemas[tableName]);
}


function addNullTofields(tableName, item){

    let schema = allSchemaFields[tableName];

    let _doc = item._doc;

    delete _doc.__v ;

    return {...schema, ..._doc}
}

function updateTableSchema(item, tableName){
    let itemFields= Object.keys(item);

    let newSchema = {};

    itemFields.forEach(
        filed =>
        {
            newSchema[filed] = 'string';
            allSchemaFields[tableName][filed] = null;
        }
    );

    allSchemas[tableName].add(newSchema)

}




function checkNotExist(item){
    return item === null || item === undefined || item.length < 1
}

function checkNull(result, res) {
    if (checkNotExist(result)){
        res.json(null);
    }
}

module.exports = {
    allSchemas,
    allModels,
    allSchemaFields,
    addNullTofields,
    checkNull,
    checkNotExist,
    updateTableSchema,
    generateSchema,
    allRelationSchemas,
    relationModels,
    generateRelationSchema
};