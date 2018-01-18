const express = require('express');
const app = express();
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty'); //allows us to access file data
const multipartMiddleware = multipart();
const cors = require('cors');
const config = require('../config');

var corsOptions = {
	origin: 'http://localhost:8080',
	optionsSuccessStatus: 200
};

// middleware
// app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.post('/upload', multipartMiddleware, (req, res) => {
	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}
	controller.upload(req.files.imageFile, res);
});

app.post('/login', (req, res) => {
	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}
	controller.login(req, res);
});

app.get('/files', (req, res) => {
	controller.getFiles(res);
});

app.get('/', (req, res) => {
	res.send('Lemme lemme upload ya');
});

app.listen(4200, () => {
	console.log('listening on ' + config.url);
});
