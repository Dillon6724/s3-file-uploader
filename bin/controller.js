const AWS = require('aws-sdk');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

AWS.config.loadFromPath(path.resolve('./bin/config.json'));

const s3 = new AWS.S3({region: 'us-east-1'})


exports.upload = (file) => {
  const params = {
        Bucket: 'emmisdigitalfileuploader',
        Key: file.name,
        ACL: 'public-read',
        Body: fs.createReadStream(file.path),
        ContentType: mime.contentType(path.extname(file.path))
    };

  console.log("processing... ")
  s3.putObject(params, function (err, data) {
    if (err) {
        console.log("Error uploading: ", err);
      } else {
        console.log("Successfully uploaded on S3", data);
      }
  })}
