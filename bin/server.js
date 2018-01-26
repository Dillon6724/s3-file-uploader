const express = require('express');
const app = express();
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty'); //allows us to access file data
const multipartMiddleware = multipart();
const cors = require('cors');
const config = require('../config');

var corsOptions = {
	origin: 'http://upload.dillon-mcguire.com',
	optionsSuccessStatus: 200
};

// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.post('/upload', multipartMiddleware, (req, res) => {
	controller.upload(req.files.imageFile, res);
});

app.post('/login', (req, res) => {
	// controller.login(req, res);
});

app.get('/files', (req, res) => {
	controller.getFiles(res);
});

app.get('/', (req, res) => {
	res.send('Lemme lemme upload ya');
});

app.listen(3000, () => {
	console.log('listening on ' + config.url);
});
