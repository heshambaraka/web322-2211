const path = require("path");
const express = require("express");
const exphbs = require('express-handlebars');

const app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));

app.set('view engine', '.hbs');

app.use(express.static(__dirname + "/public"));

// Load controllers into Express
const generalController = require("./controllers/general");
const employeeController = require("./controllers/employee");

app.use("/", generalController);
app.use("/employee", employeeController);

// setup http server to listen on HTTP_PORT
var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);