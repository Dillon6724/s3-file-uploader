import React, { Component } from 'react';
require('./library.scss');
import File from './File.js';
import Loading from './Loading.js';
import { Link } from 'react-router-dom';

export default class Library extends Component {
	render() {
		return (
			<div>
				{this.props.loading ? (
					<div>
						<Loading />
					</div>
				) : (
					<div className="browse-container">
						{this.props.files.map((file, i) => {
							return <File name={file.Key} key={i} />;
						})}
						<button className="back-button" onClick={this.props.clearState}>
							Back
						</button>
					</div>
				)}
			</div>
		);
	}
}
