let express = require("express");
let router = express.Router();
let Article = require("../models/articles");

router.get("/", (req, res, next) => {
  let articles = [];
  Article.find({}, (err, docs) => {
    articles = docs;
    console.log(articles);
    res.render("listArticles", { list: articles });
  });
});

router.get("/new", (req, res, next) => {
  res.render("createArticle");
});

router.post("/", (req, res, next) => {
  Article.create(
    {
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      author: req.body.author,
    },
    (err, doc) => {
      err ? next(err) : console.log("Article Saved");
      res.redirect("/articles");
    }
  );
});

router.get("/edit/:id", (req, res, next) => {
  Article.findOne({ _id: `${req.params.id}` }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
      res.render("editArticle", { message: doc });
    }
  });
});

router.post("/edit/:id", (req, res, next) => {
  // console.log(req.params.id, req.body);
  Article.findOneAndUpdate(
    { _id: `${req.params.id}` },
    { title: req.body.title, description: req.body.description, tags: req.body.tags, author: req.body.author },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        res.redirect("/articles");
      }
    }
  );
});

router.get("/delete/:id", (req, res, next) => {
  Article.findByIdAndDelete(req.params.id, (err, doc) => {
    err? console.log(err) : res.redirect("/articles");
  });
});

router.get("/upvote/:id", (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, {$inc: {"likes": 1}}, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/articles");
    }
  });
});

router.get("/downvote/:id", (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, {$inc: {"likes": -1}}, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/articles");
    }
  });
});
module.exports = router;
