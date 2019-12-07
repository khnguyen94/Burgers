// Import MySQL connection.
var connection = require("../config/connection");

// Create a helper function to assist in creating SQL syntax
// Queries with many variables being passed through
// At each variable postiion in the query, you are going to have a question mark
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Create a helper function to convert object key/value pairs to SQL syntax
function objToSQL(obj) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in obj) {
    var value = obj[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(obj, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  // selectAll function
  selectAll: function(table, callBackFunc) {
    // Create the query string
    var queryString = "SELECT * FROM " + table + ";";

    // Run the database connection and pass through the query string
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // callBackFunc completes the selectAll action
      callBackFunc(result);
    });
  },
  // insertOne function
  insertOne: function(table, cols, vals, callBackFunc) {
    // Create initial query string
    var queryString = "INSERT INTO " + table;

    // Add the rest of the components, one at a time
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    // Run the database connection and pass through the query string
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      // callBackFunc completes the insertOne action
      callBackFunc(result);
    });
  },
  // updateOne function
  // An example of objColVals would be {name: Krabby Patty, devoured: true}
  updateOne: function(table, objColVals, condition, callBackFunc) {
    // Create the query string
    var queryString = "UPDATE " + table;

    // Add the rest of the components, one at a time
    queryString += " SET ";
    queryString += objToSQL(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    // Run the database connection and pass through the query string
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // callBackFunc completes the updateOne action
      callBackFunc(result);
    });
  },

  // destroy function
  destroy: function(table, condition, callBackFunc) {
    // Create the query string
    var queryString = "DELETE FROM " + table;

    // Add the rest of the components, one at a time
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    // Run the database connection and pass through the query string
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // callBackFunc completes the updateOne action
      callBackFunc(result);
    });
  }
};
// Export orm
module.exports = orm;
