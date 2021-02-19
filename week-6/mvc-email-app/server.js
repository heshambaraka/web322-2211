const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config({path:"./config/keys.env"});

const app = express();

// Set up Handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));

app.set('view engine', '.hbs');

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Load Controllers
const generalController = require("./controllers/general");

app.use("/", generalController);

// Start listening
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Web Server is up and running, port ${PORT}`);    
});