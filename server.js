const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session)


const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI || "mongodb://localhost/myMiniGallery",
    collection: "sessions"
});

store.on("error", (error) => {
    console.log(error);
});

app.use(session({
    secret: "This is a secret!",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
     }, // stay logged in for 1 day
    store: store,
    // resave: true,
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

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myMiniGallery");

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});