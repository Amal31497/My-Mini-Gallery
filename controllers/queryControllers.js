const db = require("../models");

module.exports = {
    lookUpArts: function (req, res) {      
        db.Art
            .find({ tags: req.params.tag})
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    }
}