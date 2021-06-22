const db = require("../models");

module.exports = {

    findAllArt: function (req, res) {
        db.Art
            .find(req.query)
            // .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findArtById: function (req, res) {
        db.Art
            .findById(req.params.id)
            .populate('comments')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    createArt: async function (req, res) {
        try {
            const dbModel = await db.Art.create(req.body)
            
            res.status(200).json(dbModel)
        } catch (error) {
            console.error(error);
            err => res.status(422).json(err)
        }
    },
    updateArt: function (req, res) {
        db.Art
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    removeArt: function (req, res) {
        db.Art
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};