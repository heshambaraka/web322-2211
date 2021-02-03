const express = require('express');
const router = express.Router();

router.get("/", function(req,res) {
    res.render("general/home");
});

router.get("/about", function(req,res) {
    res.render("general/about");
});

module.exports = router;