module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Article({}).then(function(result) {
      let aticles = {
        result.title: x,
        result.link: y,
        result.summary: z
      };
    });
    res.render("index", { articles: data });
  });



}
