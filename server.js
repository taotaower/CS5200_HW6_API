const app = require('./express');
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./back-end/app");

// const cleanDB = require('./cleanDB');


// cleanDB.start();

const port = process.env.PORT || 80;
app.listen(port);