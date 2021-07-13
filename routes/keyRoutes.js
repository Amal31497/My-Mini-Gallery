const router = require("express").Router();
require('dotenv').config();

const config = {
    accessKey:process.env.REACT_APP_ACCESS_KEY,
    secretAccessKEY:process.env.REACT_APP_SECRET_ACCESS_KEY
}

router.route("/").get( async (req,res) => {
    try {
        res.json({keys:config});
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;