const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myMiniGallery");

const userSeed = [
    {
        firstName: "Amal",
        userName: "Amal2401",
        email: "amalj2426@gmail.com",
        description: "I love art!",
        password: "password",
        art: [
            {
                _id: 1,
                title: "Cats",
                description: "Cool fancy art",
                imgSrc: "image2321",
                tags: [{title:"Painting"}, {title:"Colors"}, {title:"Soft"}],
                date: new Date(),
                comments: [
                    {
                        _id:1,
                        content: "Great Post!",
                        date: new Date()
                    }
                ]
            },
            {
                _id: 2,
                title: "Dogs",
                description: "Cool dog art picture",
                imgSrc: "image333412",
                tags: [{title:"Photo"}, {title:"High resolution"}, {title:"Nature"}],
                date: new Date(),
                comments: [
                    {
                        _id:4,
                        content: "Cool pic!",
                        date: new Date()
                    }
                ]
            }
        ]
    },
    {
        firstName: "Jasur",
        userName: "JasurJasur",
        email: "jasur@gmail.com",
        description: "Painting is my thing!",
        password: "password",
        art: [
            {
                _id:3,
                title:"Bats",
                description:"Nice bat drawing",
                imgSrc: "image33441",
                tags: [{title:"Drawing"}, {title:"Oil"}],
                date: new Date(),
                comments: [
                    {
                        _id:2,
                        content: "I love this post!",
                        date: new Date()
                    }
                ]
            }
        ]
    }
]

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