const AWS = require('aws-sdk');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
AWS.config.loadFromPath(path.resolve('./bin/config.json'));
const s3 = new AWS.S3({region: 'us-east-1'})

exports.upload = async (file, res) => {
  s3.listObjects({Bucket: 'emmisdigitalfileuploader'}, async (err, data) => {
    createUniqueTitle(data, file.originalFilename, 0, file, res)
  })
}

const createUniqueTitle = async (data, title, int, file, res) => {
  console.log(data.Contents)
  for (let i = 0; i < data.Contents.length; i++) {
    if(data.Contents[i].Key === title) {
      int++
      const updatedTitle = iterateOnTitle(file.originalFilename);
      createUniqueTitle(data, updatedTitle, int, file, res)
      break
    } else if (i === data.Contents.length -1){
      uploadFileToS3(title, file, res);
    }
  }
}

const uploadFileToS3 = async (title, file, res) => {
  console.log("processing... ")
  const params = {
    Bucket: 'emmisdigitalfileuploader',
    Key: title,
    ACL: 'public-read',
    Body: fs.createReadStream(file.path),
    ContentType: mime.contentType(path.extname(file.path))
  };
  s3.putObject(params, function (err, data) {
    if (err) {
      console.log("Error uploading: ", err);
      } else {
        console.log("Successfully uploaded on S3", data);
        res.send({path: `https://s3.amazonaws.com/emmisdigitalfileuploader/${title}`});
      }
  })
}

const iterateOnTitle = (oldTitle) => {
  return oldTitle.substring(0, oldTitle.lastIndexOf(".")) + `(${int})` + oldTitle.substring(oldTitle.lastIndexOf("."));
}


exports.getFiles = async (res) => {
  s3.listObjects({Bucket: 'emmisdigitalfileuploader'}, async (err, data) => {
    console.log(data.Contents)
    res.send({data: data.Contents})
  })
}
