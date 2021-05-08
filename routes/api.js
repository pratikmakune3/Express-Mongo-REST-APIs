const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja");

// Get the list of ninjas from the DB
router.get("/ninjas", (req, res) => {
  res.send({ type: "GET" });
});

// Add a new ninja to the DB
router.post("/ninjas", (req, res, next) => {
  // let ninja = new Ninja(req.body);
  // ninja.save();
  // Or ->
  Ninja.create(req.body)
    .then((data) => {
      console.log("data->", data);
      res.send(data);
    })
    // next here -> next middleware in the stack -> error handler from index.js
    .catch(next);
});

// Update a ninja in the DB
router.put("/ninjas/:id", (req, res, next) => {
  const { id } = req.params;

  Ninja.findByIdAndUpdate({ _id: id }, req.body)
    .then((data) => {
      Ninja.findOne({ _id: id }).then((data) => res.send(data));
      // res.send(updatedData); // Sends the outdated data, the one which got updated. In order to fix this, we have to hit the db again to fetch updated data
    })
    .catch(next);
});

// Delete a ninja from the DB
router.delete("/ninjas/:id", (req, res, next) => {
  const { id } = req.params;

  Ninja.findByIdAndRemove({ _id: id })
    .then((data) => res.send(data))
    .catch(next);
});

module.exports = router;
