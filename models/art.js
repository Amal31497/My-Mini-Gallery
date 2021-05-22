const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artSchema = new Schema({
    description: { type: String, required: true },
    imgSrc: { type: String, required: true },
    genre: { type: String, require: true },
    date: { type: Date },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Art = mongoose.model("Art", artSchema);

module.exports = Art;