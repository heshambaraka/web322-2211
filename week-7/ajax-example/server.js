const express = require("express");
const app = express();

app.use(express.static("public"));


// API to get a list of users
app.get("/api/users", (req, res) => {
    res.json({ 
        message: "Sending a list of all users",
        htmlMessage: "Sending a list of <b>all</b> users"
     });
});

// API to get a single user
app.get("/api/users/:userId", (req, res) => {
    res.json({
        message: "Sending the user with the id " + req.params.userId,
        htmlMessage: "Sending the <b>user</b> with the id <b>" + req.params.userId + "</b>",
        userId: req.params.userId
    });
});

// Start listening
const PORT = 8080;

app.listen(PORT,()=>{
    console.log(`Web Server is up and running, port ${PORT}`);    
});