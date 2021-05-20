const db = require("../models");

module.exports = {
    findAllArt: function (req, res) {
        db.Art.find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        
    },
    findArtById: function (req, res) {
        db.Art.findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    // createArt: function (req, res) {

    // },
    // updateArt: function (req, res) {

    // },
    // removeArt: function (req, res) {

    // }
}