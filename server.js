const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session)
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3001;

const config = {
    accessKey:process.env.REACT_APP_ACCESS_KEY,
    secretAccessKEY:process.env.REACT_APP_SECRET_ACCESS_KEY,
    flickrKey:process.env.REACT_APP_FLICKR_KEY
};

// send the config variable
app.get('/getconfig', (req, res) => {
    res.json(config);
});

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI || "mongodb://localhost/myMiniGallery",
    collection: "sessions"
});

store.on("error", (error) => {
    console.log(error);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(session({
    secret: "This is a secret!",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
     }, // stay logged in for 1 day
    store: store,
    resave: true,
    saveUninitialized: true
}))


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myMiniGallery",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);


// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});