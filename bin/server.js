const express = require('express');
const app = express();
const controller = require('./controller.js')

var client = s3.createClient({
  s3Options: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
  }
});

app.post('/upload', (req, res) => {
  const file = req.body.file;
  controller.upload(file)
})

app.get('/', (req, res) => {
  res.send("Lemme lemme upload ya")
})

app.listen (3000, () => {
  console.log("listening on 3000")
})
