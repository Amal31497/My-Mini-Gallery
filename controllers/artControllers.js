const db = require("../models");

module.exports = {

    findAllArt: function (req, res) {
        db.Art
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findArtById: function (req, res) {
        db.Art
            .findById({_id:req.params.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    updateArt: async function (req, res) {
        try {
            var art;
            if(req.body._id){
                art = await db.Art.findOneAndUpdate({ _id: req.params.id}, {$push:{comments:req.body}}, {upsert:true});
            } else if(req.body.savedFavorite){
                art = await db.Art.findOneAndUpdate({ _id: req.params.id}, {$inc:{savedFavorite:1}}).exec();
            } else {
                art = await db.Art.findOneAndUpdate({ _id:req.params.id }, req.body);
            }
            await art.save();
            res.json(art)
        } catch (error) {
            console.error(error);
            res.status(400).json(error);
        }
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
    
    removeArt: function (req, res) {
        db.Art
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};