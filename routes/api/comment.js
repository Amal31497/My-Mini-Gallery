const router = require("express").Router();
const commentController = require("../../controllers/commentControllers");

// Matches with "/api/comment"
router
    .route("/")
    .get(commentController.findAllComment)
    .post(commentController.createComment);

// Matches with "/api/comments/:id"
router
    .route("/:id")
    .get(commentController.findCommentById)
    .put(commentController.updateComment)
    .delete(commentController.removeComment);

module.exports = router;




