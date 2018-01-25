import React, { Component } from 'react';
require('./header.scss');

export default class Header extends Component {
	render() {
		return (
			<header>
				<h1 onClick={this.props.clearState}>File Uploader</h1>
				<a className="logout" href="/login">
					log out
				</a>
			</header>
		);
	}
}
