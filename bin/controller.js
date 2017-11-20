const AWS = require('aws-sdk');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

AWS.config.loadFromPath(path.resolve('./bin/config.json'));

const s3 = new AWS.S3({region: 'us-east-1'})


exports.upload = async (file, res) => {

  if (!uniqueTitle(tile.originalFilename)) {

  }
    const params = {
          Bucket: 'emmisdigitalfileuploader',
          Key: file.originalFilename,
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
          res.send({path: `https://s3.amazonaws.com/emmisdigitalfileuploader/${file.originalFilename}`});
        }
    })
}

const getUniqueTitle = async (title, int) => {
  let unique;
  s3.listObjects({Bucket: 'emmisdigitalfileuploader'}, (err, data) => {
    console.log(data)
    for (let i = 0; i < data.Contents.length; i++) {
      if(data.Contents[i].Key === title) {
        const iterator = int + 1
        const newtitle = title + `(${iterator})`; //TODO: NEEDS TO BE ADDED BEFORE EXTENTION
        getUniqueTitle(newtitle, iterator)
      } else {
        console.log("loop", title)
        return unique = title
      }
    }
  })
  return unique
}

const getFiles = async () => {


}

const titleTest = async () => {
  const res = await getUniqueTitle('1.jpg', 0);
  console.log("FINAL", res)
}

titleTest()
