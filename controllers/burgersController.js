var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
//var burger = require("../models/burger.js");
var db = require('../models');

// Create all our routes and set up logic within those routes where required.

router.get('/', function (req, res) {
    //retrieve all data from burgers and the temp from the temperature table
    db.Burger.findAll({
        include: [db.Customer],
    }).then(function (data) {
        var hbsObject = { burgers: data };
        console.log(hbsObject);
        res.render('index', hbsObject);
    })
});


router.post('/api/burgers', function (req, res) {
    //create burger
    db.Burger.create({
        burger_name: req.body.burger_name,
    }).then(function (data) {
        console.log("added burger");
        res.redirect('/');
    })
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    var customer_name1 = req.body.customer_name
    console.log("condition", condition);
    db.Customer.create({
        customer_name: req.body.customer_name,
    }).then(function (data) {
        console.log("added customer_name===" + customer_name1);
        //res.redirect('/');
        db.Burger.update({
            devoured: req.body.devoured,
            CustomerId: data.id
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function (result) {
                if (result.changedRows == 0) {
                    // If no rows were changed, then the ID must not exist, so 404
                    return res.status(404).end();
                } else {
                    res.status(200).end();
                }
            });
    });
});

// Export routes for server.js to use.
module.exports = router;
