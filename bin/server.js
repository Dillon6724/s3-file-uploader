const express = require('express');
const app = express();
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty'); //allows us to access file data
const multipartMiddleware = multipart();
const cors = require('cors');
const config = require('../config');

var corsOptions = {
	origin: 'http://emmisdigital.com',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.post('/upload/upload', multipartMiddleware, (req, res) => {
	// res.setHeader('Access-Control-Allow-Origin', '*');
	controller.upload(req.files.imageFile, res);
});

app.post('/upload/login', (req, res) => {
	// res.setHeader('Access-Control-Allow-Origin', '*');
	controller.login(req, res);
});

app.get('/upload/files', (req, res) => {
	// res.setHeader('Access-Control-Allow-Origin', '*');
	controller.getFiles(res);
});

app.get('/upload', (req, res) => {
	res.send('Lemme lemme upload ya');
});

app.listen(4200, () => {
	console.log('listening on ' + config.url);
});
