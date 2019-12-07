// Import all dependencies
var orm = require("../config/orm");

// Create the function that  will call the ORM functions using burger specific input for the ORM
var burger = {
    selectAll: function(callBackFunc) {
        // Pass through just the callBackFunc
        orm.selectAll("burgers", function(res) {
            callBackFunc(res);
        })
    }, 
    insertOne: function(cols, vals, callBackFunc) {
        // Pass through cols, vals, and callBackFunc
        orm.insertOne("burgers", cols, vals, function(res) {
            callBackFunc(res);
        })
    },
    updateOne: function(objColVals, condition, callBackFunc) {
        // Pass through objColVals, condition, and callBackFunc
        orm.updateOne("burgers", objColVals, condition, function(res) {
            callBackFunc(res);
        })
    }, 
    destroy: function(condition, callBackFunc) {
        // Pass through objColVals, condition, and callBackFunc
        orm.destroy("burgers", condition, function(res) {
            callBackFunc(res);
        })
    }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;