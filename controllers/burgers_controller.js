// Import Express dependencies
var express = require("express");
var router = express.Router();

// Import burger model dependencies
var burger = require("../models/burger");

// Create the routes for the app
// GET, selectAll
router.get("/", function(req, res) {
    // run the selectAll function
    burger.selectAll(function(result) {
        // Create a variable to hold all burgers
        var allBurgers = {};

        // Assign the data returned from the selectAll function to a key burgers, place into the allBurgers object
        allBurgers = {
            burgers: result
        };

        console.log(allBurgers);

        // Render the allBurgers object using the index.handlebars template
        res.render("index", allBurgers);
    });
});

// POST, insertOne
router.post("/api/burgers", function(req, res) {
    console.log(req.body);

    // Get a handle on the values in req.body
    var valName = req.body.name; 
    var valDevoured = req.body.devoured; 

    // One array for cols
    // One array for vals
    // req.body = {name: burger1, devoured: true}
    // req.body[key][0] & req.body[key][1] for cols ???
    burger.insertOne([name, devoured], [valName, valDevoured], function(result) {
    
        // Send back the id of the new burger posted
        res.json({ id: result.id });
    });
});

// PUT, updateOne
router.put("/api/burgers/:id", function(req, res) {
    // Get a handle on the id passed, create a variable to hold it
    var idInterest = req.params.id; 

    // Create a variable to hold the condition, build it using the id obtained above
    var condition = "id = " + idInterest; 
    
    console.log("Condition: " + condition);

    // Get a hande on the body of data being passed
    var bodyInfo = req.params.body; 

    console.log(bodyInfo);

    // Run the updateOne function
    burger.updateOne(bodyInfo, condition, function(result) {
        // If no rows were changed then the id must not exist, return 404 err
        if (result.changedRows == 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });

});

// Export the router
module.exports = router;