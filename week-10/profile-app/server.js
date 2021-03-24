const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const session = require('express-session');
const dotenv = require("dotenv");
const mongoose = require('mongoose');

// Set up dotenv environment variables.
dotenv.config({path:'./config/keys.env'});

// Set up express
const app = express();

// Set up body-parser
app.use(bodyParser.urlencoded({extended:false}));

// Set up express-fileupload
app.use(fileUpload());

// Set up a static folder
app.use(express.static("public"));

// Set up handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));

app.set('view engine', '.hbs');

// Set up express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    // res.locals.user is a global handlebars variable.
    // This means that ever single handlebars file can access that user variable
    res.locals.user = req.session.user;
    next();
});

// Set up routes
const generalController = require("./controllers/general");
const userController = require("./controllers/user");

app.use("/", generalController);
app.use("/user", userController);

// Set up and connect to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("Connected to the MongoDB database.");
})
.catch((err) => {
    console.log(`There was a problem connecting to MongoDB ... ${err}`)
});

// Start up express web server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Web server started on port ${PORT}.`);
})