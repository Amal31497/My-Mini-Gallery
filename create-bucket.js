// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// Create the parameters for calling createBucket
var bucketParams = {
    Bucket: "my-mini-gallery-images"
};
// call S3 to create the bucket
s3.createBucket(bucketParams, (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success");
    }
});