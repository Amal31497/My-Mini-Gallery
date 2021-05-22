const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myMiniGallery");


const artSeed = [
    {
        description: "Cool fancy art",
        imgSrc: "image2321",
        genre: "Painting",
        // date: new Date(Date.now()),
        comments: [
            {
                content: "Cool Post!",
                // date: new Date(Date.now())
            }
        ]
    }
]

const userSeed = [
    {
        firstName: "Amal",
        userName: "Amal2401",
        email: "amalj2426@gmail.com",
        description: "I love art!",
        password: "password",
        art: ["60a96e45c4e455d0c8b96c46"]
    },
    {
        firstName: "Jasur",
        userName: "Jasur123",
        email: "jasuramirov@gmail.com",
        description: "I love good art!",
        password: "password"
    },
    {
        firstName: "Jenni",
        userName: "Jenni123",
        email: "jenni@gmail.com",
        description: "I love great art!",
        password: "password"
    }
];

db.User.remove({})
    .then(() => db.User.insertMany(userSeed))
    .then((data) => {
        console.log(data.length + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });