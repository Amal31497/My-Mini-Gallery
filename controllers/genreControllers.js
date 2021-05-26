const db = require("../models");

module.exports = {
    findAllGenre: function (req, res) {
        db.Genre
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => re.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findGenreById: function (req, res) {
        db.Genre
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    createGenre: function (req, res) {
        db.Genre
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    updateGenre: function (req, res) {
        db.Genre
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    removeGenre: function (req, res) {
        db.Genre.findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}