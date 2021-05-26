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
                res.status(200).json(userData);
            });

        } catch (error) {
            res.status(422).json(error);
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
    }
}