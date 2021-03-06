import React, { Component } from 'react';
import Header from './Header.js';
import Form from './Form.js';
import Links from './Links.js';
import Library from './Library.js';
const config = require('../../config');
import 'whatwg-fetch';
require('./app.scss');

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: [],
			paths: [],
			loading: false,
			browsing: false,
			browsingFiles: [],
			submitted: false,
			loginError: ''
		};
		this.handleImageChange = this.handleImageChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearState = this.clearState.bind(this);
		this.loadLibrary = this.loadLibrary.bind(this);
	}

	getFiles(files) {
		let filesArray = [];
		for (let i = 0; i < files.length; i++) {
			filesArray.push(files[i]);
		}
		return filesArray;
	}

	handleImageChange(e) {
		e.preventDefault();
		const files = this.getFiles(e.target.files);
		for (var i = 0; i < files.length; i++) {
			if (files[i].size < 1073741824) {
				this.setState({ files });
			} else {
				this.setState({
					loginError: 'Each file must be less than 1G'
				});
			}
		}
	}

	async sendFile(file) {
		let imageFormData = new FormData();
		imageFormData.append('imageFile', file);
		const res = await fetch(`${config.url}/upload`, {
			method: 'POST',
			body: imageFormData
		});
		return await res.json();
	}

	async handleSubmit(e) {
		e.preventDefault();
		if (this.state.files.length > 0) {
			this.setState({ loading: true, submitted: true });
			const paths = [];
			for (var i = 0; i < this.state.files.length; i++) {
				let file = this.state.files[i];
				const data = await this.sendFile(file);
				paths.push(data.path);
				if (i === this.state.files.length - 1)
					this.setState({ paths, loading: false, browsingFiles: [] });
			}
		} else {
			this.setState({ loginError: 'Please select a file to upload' });
		}
	}

	clearState() {
		this.setState({
			files: [],
			paths: [],
			loading: false,
			browsing: false,
			submitted: false,
			loginError: ''
		});
	}

	async loadLibrary(e) {
		e.preventDefault();
		this.setState({
			browsing: true,
			loading: true
		});
		const res = await fetch(`${config.url}/files`, {
			method: 'get'
		});
		const files = await res.json();
		this.setState({
			loading: false,
			browsingFiles: files.data.sort((a, b) => a.Key.localeCompare(b.Key))
		});
	}

	render() {
		return (
			<div>
				<Header clearState={this.clearState} />
				{this.state.browsing ? (
					<Library
						loading={this.state.loading}
						files={this.state.browsingFiles}
						clearState={this.clearState}
					/>
				) : this.state.submitted ? (
					<Links
						loading={this.state.loading}
						paths={this.state.paths}
						clearState={this.clearState}
					/>
				) : (
					<Form
						handleSubmit={this.handleSubmit}
						handleImageChange={this.handleImageChange}
						browsing={this.state.browsing}
						loadLibrary={this.loadLibrary}
						clearState={this.clearState}
						files={this.state.browsingFiles}
						error={this.state.loginError}
					/>
				)}
			</div>
		);
	}
}
