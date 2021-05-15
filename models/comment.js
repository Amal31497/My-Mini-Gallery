const User = require("./user")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {ref: User},
    content: { type: Text, required: true },
    date: { type: Date }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;