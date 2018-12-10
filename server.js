const app = require('./express');
require("./back-end/app");


const port = process.env.PORT || 80;
app.listen(port);