const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
    findAllUsers: function (req, res) {
        db.User
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findUserById: function (req, res) {
        db.User
            .findById(req.params.id)
            .populate("art")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    createUser: async (req, res) => {
        try {
            const newUser = req.body;
            newUser.password = await bcrypt.hash(req.body.password, 10);
            const userData = await db.User.create(newUser)
            req.session.save(() => {
                req.session.user_id = userData._id;
                req.session.logged_in = true;
                res.status(200).json({
                    user_id: userData._id,
                    username: userData.username,
                    email: userData.email
                });
            });
        } catch (error) {
            console.log(error)
            res.status(422).json(error);
        }
    },

    loginUser: async (req, res) => {
        try {
            const userData = await db.User.findOne({ username: req.body.username });
            if (!userData) {
                res.status(400).json({ message: "Incorrect email or password, please try again!" });
                return;
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                userData.password
            )
            if (!validPassword) {
                res.status(400).json({ message: "Incorrect email or password, please try again!" });
                return;
            }
            req.session.save(() => {
                req.session.user_id = userData._id;
                req.session.logged_in = true;
                res.json({ user: { 
                    username: userData.username, 
                    user_id: userData._id }, 
                    message: "You are successfully logged in!" 
                });
            });
            // add additional user data such as art, email, etc!
            
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    logoutUser: function (req, res) {
            if (req.session.logged_in) {
                req.session.destroy(() => {
                    res.status(204).end();
                });
            } else {
                res.status(404).end();
            }
    },

    updateUser: function (req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    removeUser: function (req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    authenticatedUser: function (req,res) {
        if (req.session.logged_in) {
            res.status(200).json({ user_id: req.session.user_id })
        } else {
            res.status(204).end();
        }
    }
}