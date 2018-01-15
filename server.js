const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const logger = require("morgan");
// const exphbs = require("express-handlebars");
// const axios = require("axios");
// const cheerio = require("cheerio");
// const db = require("./models");
const PORT = process.env.PORT || 8080;
const app = express();

// app.use(logger("dev"));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.statis("public"));
//
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");
//
// require("./controllers/techNowController")(app);

mongoose.Promise = Promise;

const database = "mongodb://localhost/techNow";
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(database);
}

const db = mongoose.connection;

db.on("error", function(err) {
  console.log(`Mongoose Error: ${err}`);
});

db.once("open", function() {
  console.log("connection was successful");
});

app.listen(PORT, function() {
  console.log(`Port: ${PORT} is running`)
});
