const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Set up Express.
const app = express();

// Set up Handlebars.
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));

app.set("view engine", ".hbs");

// Set up Body Parser.
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the MongoDB
mongoose.connect("Paste your connection string here", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
     }
);

// Define our Models
const Schema = mongoose.Schema;

const NameSchema = new Schema({
    "nickname": {
        "type": String,
        "unique": true
    },
    "fName": String,
    "lName": String,
    "age": {
        "type": Number,
        "default": 25
    }
});

var NameModel = mongoose.model("names", NameSchema);

// Define the "/" route
app.get("/", (req, res) => {
    NameModel.find()
    .exec()
    .then((data) => {
        // Pull the data (exclusively)
        // This is to ensure that our "data" object contains the returned data (only) and nothing else.
        data = data.map(value => value.toObject());

        // Render the "viewTable" view with the data
        res.render("viewTable", {
            data: data,
            layout: false // Do not use the default Layout (main.hbs)
        });
    });
});

// Define the "/addName" route
app.post("/addName", (req, res) => {
    var newName = new NameModel({
        nickname: req.body.nickname,
        lName: req.body.lName,
        fName: req.body.fName
    });

    var age = parseInt(req.body.age);

    if (isNaN(age)){
        age = undefined;
    }

    newName.age = age;

    newName.save((err) => {
        if (err) {
            console.log("Couldn't create the new name:" + err);
        }
        else {
            console.log("Successfully created a new name: " + newName.nickname);
        }

        res.redirect("/");  // Redirect back to the home page
    });
});

// Define the "/updateName" route
app.post("/updateName", (req, res) => {
    // Check to see if both first name & last name fields are blank
    if (req.body.lName.length == 0 && req.body.fName.length == 0) {
        // Remove a record from the  "name" model with the data from req.body
        NameModel.deleteOne({
            nickname: req.body.nickname
        })
        .exec()
        .then(() => {
            console.log("Successsfully removed user: " + req.body.nickname);
            res.redirect("/"); // Redirect back to the home page
        })
    }
    else {
        // Update a record using the "name" model with the data from req.body
        NameModel.updateOne({
            nickname: req.body.nickname
        }, {
            $set: {
                lName: req.body.lName,
                fName: req.body.fName,
                age: req.body.age
            }
        })
        .exec()
        .then(() => {
            console.log("Successfully updated name: " + req.body.nickname);
            res.redirect("/"); // Redirect back to the home page
        });
    }
});

// Start listening.
const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Start the server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);