const employeeModel = require("../models/employeeList");
const express = require('express');
const router = express.Router();

router.get("/list", (req, res) => {
    res.render("employee/list", {
        employees: employeeModel.getAllEmployees()
    });
});

router.get("/add", (req, res) => {
    res.render("employee/list", {
        employees: employeeModel.getAllEmployees()
    });
});

router.get("/delete", (req, res) => {
    res.render("employee/list", {
        employees: employeeModel.getAllEmployees()
    });
});

module.exports = router;