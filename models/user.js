const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const commentSchema = new Schema({
    _id: { type: Number, required: true },
    content: { type: String, required: true },
    date: { type: Date }
})

const genreSchema = new Schema({
    keyword: { type: String, required: true },
});

const artSchema = new Schema({
    _id: { type: Number, required: true },
    title: { type: String, require: true },
    description: { type: String, required: true },
    imgSrc: { type: String, required: true },
    genre: [genreSchema],
    tags: [{ type: String, required: true }],
    user: { type: String, required: true },
    date: { type: Date },
    comments: [commentSchema]
});

const userSchema = new Schema({
    firstName: { type: String },
    username: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    description: { type: String },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    art: [artSchema]
});

const User = mongoose.model("User", userSchema);
const Art = mongoose.model("Art", artSchema)
const Comment = mongoose.model("Comment", commentSchema)
const Genre = mongoose.model("Genre", genreSchema);

module.exports = { User,Art,Comment,Genre };



