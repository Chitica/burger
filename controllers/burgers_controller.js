var express = require("express");

var router = express.Router();

var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers
  app.get("/Burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burgers.findAll({}).then(function(dbBurgers) {
      // We have access to the burgers as an argument inside of the callback function
      res.json(dbBurgers);
    });
  });

  // POST route for saving a new Burger
  app.post("/Burgers", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Burgers.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

 
  app.delete("/Burgers/:id", function(req, res) {
    db.Burgers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
    });

  });

  app.put("/Burgers", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Burgers.update({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};
