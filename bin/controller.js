const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
AWS.config.loadFromPath(path.resolve(__dirname, '../config/aws.json'));
const s3 = new AWS.S3({ region: 'us-east-1' });
const db = require('./db/queries.js');
const bcrypt = require('bcrypt');

exports.upload = async (file, res) => {
	s3.listObjects({ Bucket: 'emmisdigitalfileuploader' }, async (err, data) => {
		createUniqueTitle(data, file.originalFilename, 0, file, res);
	});
};

const createUniqueTitle = async (data, title, int, file, res) => {
	for (let i = 0; i < data.Contents.length; i++) {
		if (data.Contents[i].Key === title) {
			int++;
			const updatedTitle = iterateOnTitle(file.originalFilename, int);
			createUniqueTitle(data, updatedTitle, int, file, res);
			break;
		} else if (i === data.Contents.length - 1) {
			uploadFileToS3(title, file, res);
		}
	}
};

const uploadFileToS3 = async (title, file, res) => {
	const params = {
		Bucket: 'emmisdigitalfileuploader',
		Key: title,
		ACL: 'public-read',
		Body: fs.createReadStream(file.path),
		ContentType: mime.contentType(path.extname(file.path))
	};
	s3.putObject(params, function(err, data) {
		if (err) {
			console.log('Error uploading: ', err);
		} else {
			console.log('Success: ', data, '\n');
			res.send({
				path: `https://s3.amazonaws.com/emmisdigitalfileuploader/${title}`
			});
		}
	});
};

const iterateOnTitle = (oldTitle, int) => {
	return (
		oldTitle.substring(0, oldTitle.lastIndexOf('.')) +
		`(${int})` +
		oldTitle.substring(oldTitle.lastIndexOf('.'))
	);
};

exports.getFiles = async res => {
	s3.listObjects({ Bucket: 'emmisdigitalfileuploader' }, async (err, data) => {
		res.send({ data: data.Contents });
	});
};

exports.login = async (req, res) => {
	const dbUser = await db.getUser(req.body);
	if (dbUser) {
		bcrypt.compare(req.body.password, dbUser.password, function(err, matching) {
			if (matching) {
				res.send({ status: true, message: 'success' });
			} else {
				res.send({
					status: false,
					message: 'Incorrect email & password combo'
				});
			}
		});
	} else {
		res.send({ status: false, message: 'Incorrect email & password combo' });
	}
};
