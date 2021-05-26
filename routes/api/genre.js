const router = require("express").Router();
const genreController = require("../../controllers/genreControllers");

// Matches with "/api/genres"
router
    .route("/")
    .get(genreController.findAllGenre)
    .post(genreController.createGenre);

// Matches with "/api/genres/:id"
router
    .route("/:id")
    .get(genreController.findGenreById)
    .put(genreController.updateGenre)
    .delete(genreController.removeGenre);

module.exports = router;
