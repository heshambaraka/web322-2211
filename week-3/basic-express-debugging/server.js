const path = require("path");
const myModule = require("./modules/mymodule.js");
const express = require("express");
const app = express();

// Setup a folder that static resources can load from.
// Include images, css files, etc.
app.use(express.static("static"));

// Set up a route to our homepage.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

// http://localhost/nameq?name=Nick
app.get("/nameq", (req, res) => {
    var name = req.query.name;
    var helloName = myModule.sayHello(name || "No Name");
    res.send(helloName);
});

// http://localhost/namep/Nick
app.get("/namep/:name", (req, res) => {
    var name = req.params.name;
    var helloName = myModule.sayHello(name || "No Name");
    res.send(helloName);
});

// Set up a route to a header page (http://localhost:8080/headers)
app.get("/headers", (req, res) => {
    const headers = req.headers;
    res.send(headers);
});

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);