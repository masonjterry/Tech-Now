const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Article.find({}).then(function(data) {
      console.log(data);
      let articles = {};
      res.render("index", { articles: data });
    });
  });

  app.get("/scrape", function(req, res) {
    axios.get("https://techcrunch.com/").then(function(response) {

      let $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("h2.post-title").each(function(i, element) {
        // Save an empty result object
        let result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
        result.summary = $("p.excerpt").text();
        result.saved = "false";
        // Create a new Article using the `result` object built from scraping
        db.Article
          .create(result)
          .then(function(dbArticle) {
            // If we were able to successfully scrape and save an Article, send a message to the client
            res.send("scraped");
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });
    });
  });

}
