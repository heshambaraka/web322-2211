const express = require('express')
const router = express.Router();

router.get("/", (req, res)=> {
    res.render("general/home", {
        title: "Home Page"
    });
});

router.get("/contact-us", (req, res) => {
    res.render("general/contactUs", {
        title: "Contact Us"
    });
});

router.post("/contact-us", (req, res) => {
    console.log(req.body);

    let validationResults = {};
    let passedValidation = true;

    const { firstName, lastName, email, message } = req.body;

    if (typeof firstName !== "string" || firstName.length === 0) {
        validationResults.firstName = "You must specify a first name."
        passedValidation = false;
    }
    else if (firstName.length < 2) {
        validationResults.firstName = "The first name must be at least 2 characters.";
        passedValidation = false;
    }

    if (passedValidation) {
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

        const msg = {
            to: "nick.romanidis@gmail.com",
            from: "nick.romanidis@senecacollege.ca",
            subject: "Contact Us Form Submission",
            html:
                `Vistor's Full Name: ${firstName} ${lastName}<br>
                Vistor's Email Address: ${email}<br>
                Vistor's message: ${message}<br>
                `
        };

        // Asyncronously sends the email message.
        sgMail.send(msg)
            .then(() => {
                res.send("Success");
            })
            .catch(err => {
                console.log(`Error ${err}`);
                res.send("Error");
            });
    }
    else
    {
        res.render("general/contactUs", {
            title: "Contact Us",
            validationResults: validationResults,
            values: req.body
        });
    }
});

module.exports = router;