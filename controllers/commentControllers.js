const db = require("../models");

module.exports = {
    findAllComment: function (req, res) {
        db.Comment
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findCommentById: function (req, res) {
        db.Comment
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    createComment: async function (req, res) {
        try {
            const dbModel = await db.Comment.create(req.body)
            
            res.status(200).json(dbModel);
        } catch (error) {
            console.error(error);
            error => res.status(422).json(error)
        }
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
