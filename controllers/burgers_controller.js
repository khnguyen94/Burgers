// Import Express dependencies
var express = require("express");
var router = express.Router();

// Import burger model dependencies
var burger = require("../models/burger");

// Create the routes for the app
// GET, selectAll
router.get("/", function(req, res) {
    // run the selectAll function
    burger.selectAll(function(data) {
        // Create a variable to hold all burgers
        var allBurgers = {};

        // Assign the data returned from the selectAll function to the key burgers, place into the allBurgers object
        allBurgers = {
            burgers: data
        };

        console.log(allBurgers);

        // Render the allBurgers object using the index.handlebars template
        res.render("index", allBurgers);
    });
});

// POST, insertOne
router.post("/api/burgers", function(req, res) {
    burger.insertOne([name, devoured], [req.body.name, req.body.devoured], function(result) {
    
        // Send back the id of the new burger post
        res.json({ id: result.id });

    });
});

// PUT, updateOne
router.put("/api/burgers/:id", function(req, res) {

});

// Export the router
module.exports = router;