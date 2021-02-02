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

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){

    var someData = [
        {
            name: "John",
            age: 23,
            occupation: "Developer",
            company: "Scotiabank",
            visible: true
        },
        {
            name: "Frank",
            age: 40,
            occupation: "Project Manager",
            company: "Scotiabank",
            visible: false
        },
        {
            name: "Elmo",
            age: 39,
            occupation: "Manager",
            company: "Seneca",
            visible: true
        }
    ];

    res.render("home", {
        employees: someData
    });
});

app.get("/about", function(req,res) {
    res.render("about");
});

// setup http server to listen on HTTP_PORT
var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);