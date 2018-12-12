
const actorSchema = {
    id: null,
};

const movieSchema = {
    id: null,
};

function addNullTofields(schema, item){

    let _doc = item._doc;
    let new_doc = {...schema, ..._doc};
    let res = {};
    Object.keys(schema).forEach(
        key =>{
            res[key] = new_doc[key];
        }
    );

    return res

}

function checkNull(result, res) {
    if (result === null || result === undefined || result.length < 1 ){
        res.json(null);
    }
}

module.exports = {
    addNullTofields,
    checkNull,
    actorSchema,
    movieSchema,

};