const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Email validation config using regex
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


// Art schema
const artSchema = new Schema([{
    title: { type: String, required: true },
    description: { type: String, required: true },
    src: { type: String, required: true },
    tags: [{ type: String, required: true }],
    user: { type: String, required: true },
    genre: { type: String, required: true },
    date: { type: Date, required: true },
    width: {type: Number, required: true },
    height: {type: Number, required: true },
    widthRatio: { type: Number, required: true },
    heightRatio: { type: Number, required:true },
    comments: [{ type: String }],
    savedFavorite: { type: Number }
}]);


// Comment schema
const commentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: String, required: true },
    userInfo: { type: Object, required: true },
    date: { type: Date, required: true },
    assetSrc: { type: String },
    art: { type: String },
    responses: [new Schema([{
        content: { type: String, required:true },
        user: { type: String, required: true },
        userInfo: { type: Object, required: true },
        date: { type: Date, required: true },
        assetSrc: { type: String },
    }])]
});


//Avatar (User) schema
const avatarSchema = new Schema({
    avatarSrc: { type: String },
    avatarWidthRatio: { type: Number },
    avatarHeightRatio: { type: Number }
})


// User schema
const userSchema = new Schema({
    firstName: { type: String },
    username: { type: String, required: true },
    avatar: avatarSchema,
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
    art:[{ type:String }],
    favorites:[{ type:String }],
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    date: { type: Date, required:true }
});


// Shcemas modelling
const User = mongoose.model("User", userSchema);
const Art = mongoose.model("Art", artSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Avatar = mongoose.model("Avatar", avatarSchema);

module.exports = { User,Art,Comment,Avatar };


