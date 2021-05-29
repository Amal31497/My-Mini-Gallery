const router = require("express").Router();
const userController = require("../../controllers/userControllers");

// Matches with "/api/user"
router
    .route("/")
    .get(userController.findAllUsers)
    // user signup!
    .post(userController.createUser);

// Matches with "/api/login"
router
    .route("/login")
    // user login!
    .post(userController.loginUser);

// Matches with "api/logout"
router
    .route("/logout")
    // user logout!
    .post(userController.logoutUser);

// Matches with "/api/user/:id"
router
    .route("/:id")
    .get(userController.findUserById)
    .put(userController.updateUser)
    .delete(userController.removeUser);

module.exports = router;