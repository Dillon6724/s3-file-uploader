import React, { Component } from 'react';
require('./loading.scss');

export default class Loading extends Component {
	render() {
		return (
			<div>
				<img
					className="loader"
					src="https://s3.us-east-2.amazonaws.com/dillonfileuploader/loading.gif"
				/>
			</div>
		);
	}
}
