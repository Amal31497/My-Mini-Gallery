const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    keyword: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;