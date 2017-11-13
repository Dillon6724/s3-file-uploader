const express = require('express');
const app = express();
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty'); //allows us to access file data
const multipartMiddleware = multipart();

app.post('/upload', multipartMiddleware, (req, res) => {
  controller.upload(req.files.file)
})

app.get('/', (req, res) => {
  res.send("Lemme lemme upload ya")
})

app.listen (3000, () => {
  console.log("listening on 3000")
})
