const router = require("express").Router();
const queryController = require("../../controllers/queryControllers");

router
    .route("/:tag")
    .get(queryController.lookUpArts)

module.exports = router;