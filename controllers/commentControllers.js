const db = require("../models");

module.exports = {
    findAllComment: function (req, res) {
        db.Comment
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => re.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findCommentById: function (req, res) {
        db.Comment
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    createComment: function (req, res) {
        db.Comment
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    updateComment: function (req, res) {
        db.Comment
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    removeComment: function (req, res) {
        db.Comment.findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}
