const db = require("../models");

module.exports = {
    findAllComment: function (req, res) {
        db.Comment
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    findCommentById: function (req, res) {
        db.Comment
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    updateComment: async function (req, res) {
        try {
            var comment = await db.Comment.findOneAndUpdate({ _id: req.params.id }, { $push: { responses: req.body.response } }, { upsert: true }, { new: true })
            
            console.log(req.body)
            // await comment.save();
            res.json(comment)
        } catch (error) {
            console.error(error);
            res.status(400).json(error);
        }
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
    
    removeComment: function (req, res) {
        db.Comment.findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    removeArtComments: async function (req,res) {
        try {
            const comments = await db.Comment.deleteMany({ art: req.params.art });
            
            res.status(200).json(comments);
        } catch (error) {
            console.error(error);
            error => res.status(422).json(error)
        }
    },

    removeUserComments: async function (req,res) {
        try {
            const comments = await db.Comment.deleteMany({ user: req.params.user });
            
            res.status(200).json(comments);
        } catch (error) {
            console.error(error);
            error => res.status(422).json(error)
        }
    }
    
}
