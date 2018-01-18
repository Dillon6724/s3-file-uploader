import React, { Component } from 'react';
require('./header.scss');

export default class Header extends Component {
	render() {
		return (
			<header>
				<img
					onClick={this.props.clearState}
					src="http://base.emmis.acsitefactory.com/sites/all/modules/custom/emmis_theme/logos/base.png"
				/>
				<a className="logout" href="/upload/login">
					log out
				</a>
			</header>
		);
	}
}
