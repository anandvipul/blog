let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let article = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    tags: {type: [String]},
    author: {type: String},
    likes: {type: Number}
}, {timestamps: true});

let Article = mongoose.model("Articles", article);

module.exports = Article;