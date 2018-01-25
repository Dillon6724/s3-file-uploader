import React, { Component } from 'react';
require('./form.scss');
import { Link } from 'react-router-dom';

export default class Form extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h2>Upload your files</h2>
				<h2 className="form-error">{this.props.error}</h2>
				<form>
					<div className="file-input-container">
						<input
							className="choose-file"
							type="file"
							onChange={this.props.handleImageChange}
							multiple
						/>
					</div>
					<button
						className="submit"
						type="submit"
						to="/myfiles"
						onClick={this.props.handleSubmit}>
						Upload
					</button>
					<h2>Find your files</h2>
					<button className="submit" onClick={this.props.loadLibrary}>
						Library
					</button>
				</form>
			</div>
		);
	}
}
