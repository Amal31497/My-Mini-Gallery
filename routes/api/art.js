const router = require("express").Router();
const artController = require("../../controllers/artControllers");

// Matches with "/api/posts"
router
    .route("/")
    .get(artController.findAll)
    .post(artController.create);

// Matches with "/api/posts/:id"
router
    .route("/:id")
    .get(artController.findById)
    .put(artController.update)
    .delete(artController.remove);

module.exports = router;