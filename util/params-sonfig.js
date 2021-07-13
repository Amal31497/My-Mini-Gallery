const { v4: uuidv4 } = require('uuid');

const params = (fileName) => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const imageParams = {
        Bucket: 'my-mini-gallery-images',
        Key: `${uuidv4()}.${fileType}`,
        Body: fileName.buffer,
        ACCESS_KEY: process.env.REACT_APP_ACCESS_KEY,
        SECRET_ACCESS_KEY: process.env.REACT_APP_SECRECT_ACCESS_KEY
        // ACL: 'public-read' // allow read access to this file
    };

    return imageParams;
};

module.exports = params;