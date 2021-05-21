const router = require("express").Router();
const artController = require("../../controllers/artControllers");

// Matches with "/api/posts"
router
    .route("/")
    .get(artController.findAllArt)
    .post(artController.createArt);

// Matches with "/api/posts/:id"
router
    .route("/:id")
    .get(artController.findArtById)
    .put(artController.updateArt)
    .delete(artController.removeArt);

module.exports = router;