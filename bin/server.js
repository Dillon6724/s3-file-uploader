const express = require('express');
const app = express();
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty'); //allows us to access file data
const multipartMiddleware = multipart();
const cors = require('cors');
const config = require('../config');

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.post('/upload', multipartMiddleware, (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	controller.upload(req.files.imageFile, res);
});

app.post('/login', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	controller.login(req, res);
});

app.get('/files', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	controller.getFiles(res);
});

app.get('/', (req, res) => {
	res.send('Lemme lemme upload ya');
});

app.listen(config.port, () => {
	console.log('listening on ' + config.port);
});
