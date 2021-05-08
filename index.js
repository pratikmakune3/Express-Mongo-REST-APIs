const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// connect to mongodb, database - ninjago, mongodb auto creates it!
mongoose.connect("mongodb://localhost/ninjago");
// mongoose Promise is deprecated; overriding it with global object Promise
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

const loggerMiddleware = (req, res) => {
  console.log("loggerMiddleware called...");
};

app.use((req, res, next) => {
  loggerMiddleware(req, res);
  next();
});

// Initialise routes ->
// Everything after /api is going to use routes(2nd param) froma app.use
app.use("/api", routes);

// Error handling middleware, recieves 4 params
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 4000, () => console.log(`Listening on 4000`));
