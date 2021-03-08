const express = require("express");
const exphbs = require("express-handlebars");
const sequelizeModule = require("sequelize");
const bodyParser = require("body-parser");

// Don't forget to install pg as well.
// npm install pg pg-hstore

// Set up Express.
const app = express();

// Set up Handlebars.
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));

app.set("view engine", ".hbs");

// Set up Body Parser.
app.use(bodyParser.urlencoded({ extended: true }));

// Define the connection to our Postgres instance 
const sequelize = new sequelizeModule("database", "user", "password", {
  host: "host",
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  }
});

// Define our Models - "name"
const name = sequelize.define("Name", {
  fName: sequelizeModule.STRING,  // first name
  lName: sequelizeModule.STRING, // Last name
});

// Define the "/" route
app.get("/", (req, res) => {
    // Fetch all of the names and order them by id
    name.findAll({
        order: ["id"]
    }).then((data) => {
        // Pull the data (exclusively)
        // This is to ensure that our "data" object contains the returned data (only) and nothing else.
        data = data.map(value => value.dataValues);

        // Render the "viewTable" view with the data
        res.render("viewTable", {
            data: data,
            layout: false // Do not use the default Layout (main.hbs)
        });
    });
});

// Define the "/updateName" route
app.post("/updateName", (req, res) => {
    // Check to see if both first name & last name fields are blank
    if (req.body.lName.length == 0 && req.body.fName.length == 0) {
        // Remove a record from the  "name" model with the data from req.body
        name.destroy({
            where: { id: req.body.id }
        }).then(() => {
            console.log("successsfully removed user: " + req.body.id);
            res.redirect("/"); // Redirect back to the home page
        });
    } else {
        // Update a record using the "name" model with the data from req.body
        name.update({
            lName: req.body.lName,
            fName: req.body.fName
        }, {
            where: { id: req.body.id }
        }).then(() => {
            console.log("successfully updated name: " + req.body.id);
            res.redirect("/"); // Redirect back to the home page
        });
    }
});

// Define the "/addName" route
app.post("/addName", (req, res) => {
    // Create a record using the "name" model with the data from req.body
    name.create({
        lName: req.body.lName,
        fName: req.body.fName
    }).then(() => {
        console.log("successfully created a new name");
        res.redirect("/");
    });
});

// Start listening.
const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Synchronize the database before we start the server.
sequelize.sync().then(() => {
    // Start the server to listen on HTTP_PORT
    app.listen(HTTP_PORT, onHttpStart);
});