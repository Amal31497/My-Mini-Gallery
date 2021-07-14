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

router
    .route("/emptyArtComments/:art")
    .delete(commentController.removeArtComments)

router
    .route("/emptyUserComments/:user")
    .delete(commentController.removeUserComments);

module.exports = router;




