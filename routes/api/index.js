const router = require("express").Router();
const artRoutes = require("./art");
const genreRoutes = require("./genre");
const userRoutes = require("./user");
const commentsRoutes = require("./comment")

// Post routes
router.use("/art", artRoutes);
router.use("/genre", genreRoutes);
router.use("/user", userRoutes);
router.use("/comment", commentsRoutes);

module.exports = router;