const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Step1 - Create Ninja schema
const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  rank: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
});

// Step2 - Create ninja model
// Ninja -> model & ninja -> collection in db
// mongodb pluralise ninja -> ninjas collection in db
const Ninja = mongoose.model("ninja", NinjaSchema);

module.exports = Ninja;
