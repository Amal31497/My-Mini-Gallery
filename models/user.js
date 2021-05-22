const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    firstName: { type: String, required: true },
    userName: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    description: { type: String, required: true },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        // validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    art: [
        {
            type: Schema.Types.ObjectId,
            ref: "Art"
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;