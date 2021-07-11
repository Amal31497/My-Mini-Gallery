const router = require("express").Router();
const artRoutes = require("./art");
const queryRoutes = require("./queries");
const userRoutes = require("./user");
const commentsRoutes = require("./comment")

router.use("/art", artRoutes);
router.use("/query", queryRoutes);
router.use("/user", userRoutes);
router.use("/comment", commentsRoutes);

module.exports = router;