import React, { Component } from 'react';
require('./file.scss');

export default class File extends Component {
	render() {
		const path = `https://s3.us-east-2.amazonaws.com/dillonfileuploader/${
			this.props.name
		}`;
		return (
			<div className="file-container">
				<a target="_blank" className="path" href={path}>
					{this.props.name}
				</a>
			</div>
		);
	}
}
