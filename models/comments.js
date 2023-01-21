let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let comment = new Schema({
    content: {type: String, required: true},
    articleId: {type: Schema.Types.ObjectId, ref: "Articles", required: true},
    likes: {type: Number},
    author: {type: String}
}, {timestamps: true});

let Comment = mongoose.model("Comment", comment);

module.exports = Comment;