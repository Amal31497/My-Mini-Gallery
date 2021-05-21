const router = require("express").Router();
const commentController = require("../../controllers/commentControllers");

// Matches with "/api/comments"
router
    .route("/")
    .get(commentController.findAll)
    .post(commentController.create);

// Matches with "/api/comments/:id"
router
    .route("/:id")
    .get(commentController.findById)
    .put(commentController.update)
    .delete(Controller.remove);

module.exports = router;




