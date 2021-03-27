const express = require('express');
const bcrypt = require("bcryptjs");
const path = require("path");
const userModel = require('../models/user');
const router = express.Router();

// Set up registration page
router.get("/register", (req, res) => {
    res.render("user/register");
});

router.post("/register", (req, res) => {
    const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
    .then((userSaved) => {
        // User was saved correctly.
        console.log(`User ${userSaved.firstName} has been saved to the database.`);

        // Rename the file name so that it is unique on our system.
        req.files.profilePic.name = `pro_pic_${userSaved._id}${path.parse(req.files.profilePic.name).ext}`;

        // Copy the image data to a file in the "public/uploads" folder.
        req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name}`)
        .then(() => {

            // Update the user document so that it contains the name of the image
            // file we saved. Do this as a second step the file could not be saved
            // correctly.
            userModel.updateOne({
                _id: userSaved._id
            }, {
                profilePic: req.files.profilePic.name
            })
            .then(() => {
                console.log("User document was updated with the profile pic file name.")

                // Create a new session and set the user to the
                // "user" document returned from the DB.
                req.session.user = user;

                res.redirect("/");
            })
            .catch((err) => {
                console.log(`Error updating the user.  ${err}`);
                res.redirect("/");
            });
        });
    })
    .catch((err) => {
        console.log(`Error adding user to the database.  ${err}`);

        res.redirect("/");
    });
});

// Set up login page
router.get("/login", (req, res) => {
    res.render("user/login");
});

router.post("/login", (req, res) => {
    let errors = [];

    // Search MongoDB for a document with the matching email address.
    userModel.findOne({
        email: req.body.email
    })
    .then((user) => {
        if (user) {
            // User was found, compare the password in the database
            // with the password submitted by the user.
            bcrypt.compare(req.body.password, user.password)
            .then((isMatched) => {
                if (isMatched) {
                    // Password is matched.

                    // Create a new session and set the user to the
                    // "user" object returned from the DB.
                    req.session.user = user;

                    res.redirect("/");
                }
                else {
                    // Password does not match.
                    errors.push("Sorry, your password does not match our database.")

                    res.render("user/login", {
                        errors
                    });
                }
            })
            .catch((err) => {
                // bcrypt failed for some reason.
                console.log(`Error comparing passwords: ${err},`);
                errors.push("Oops, something went wrong.");
        
                res.render("user/login", {
                    errors
                });
            });
        }
        else {
            // User was not found in the database.
            errors.push("Sorry, your email was not found.")

            res.render("user/login", {
                errors
            });
        }
    })
    .catch((err) => {
        // Couldn't query the database.
        console.log(`Error finding the user from the database: ${err},`);
        errors.push("Oops, something went wrong.");

        res.render("user/login", {
            errors
        });
    });
});

// Set up logout page
router.get("/logout", (req, res) => {
    // Clear the session from memory.
    req.session.destroy();
    
    res.redirect("/user/login");
});


module.exports = router;