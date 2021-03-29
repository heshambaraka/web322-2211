const express = require("express");
const mongoose = require("mongoose");

// Set up Express.
const app = express();

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

// Define the "/load-data" route
app.get("/load-data", (req, res) => {

    // TODO: Protect this route so only developers can access it.

    NameModel.find().count({}, (err, count) => {
        if (err) {
            return res.send(err);
        }
        else if (count === 0) {
            var names = [
                { nickname: "Nick", fName: "Nicholas", lName: "Romanidis", age: 40 },
                { nickname: "Luke", fName: "Thomas", lName: "Bryan", age: 44 }
            ];

            NameModel.collection.insertMany(names, (err, docs) => {
                if (err) {
                    return res.send(err);
                }
                else {
                    res.send("Success");
                }
            });
        }
        else {
            res.send("Data is already loaded");
        }
    });
    
});



// Start listening.
const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Start the server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);