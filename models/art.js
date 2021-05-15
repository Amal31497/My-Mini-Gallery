const User = require("./user")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artSchema = new Schema({
    user: {ref: User},
    description: { type: Text, required: true },
    comments: { ref: Comments },
    imgSrc: { type: String, required: true },
    genre: { type: String, require: true }
});

const Art = mongoose.model("Art", artSchema);

module.exports = Art;