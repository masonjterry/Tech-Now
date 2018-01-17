const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {
  app.get("/", function(req, res) {

    db.Article.find({}).sort({_id: -1}).then(function(data) {
      let articles = {};
      res.render("index", { articles: data });
    });
  });

  app.get("/scrape", function(req, res) {
    axios.get("https://techcrunch.com/").then(function(response) {

      let $ = cheerio.load(response.data);

      $("h2.post-title").each(function(i, element) {
        let result = {};

        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");
        result.summary = $("p.excerpt").text();
        result.saved = "false";

        db.Article.create(result).then(function(dbArticle) {
          let articles = {};
            res.send(dbArticle);
          }).catch(function(err) {
            res.json(err);
          });
      });
    });
  });

  app.get("/saved", function(req, res) {
    db.Article.find({ saved: true }).then(function(data) {
      let saved = {};
      res.render("saved", { saved: data });
    });
  });

  app.post("/api/saved/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, {$set: {saved: true}}).then(function(data) {

    });
  });

  app.post("/api/unsaved/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, {$set: {saved: false}}).then(function(data) {

    });
  });

}
