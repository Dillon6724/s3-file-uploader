import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'whatwg-fetch';
require('./login.scss');
const config = require('../config');

import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom';

const Auth = () => (
	<Router>
		<div>
			<Route path="/upload/login" component={Login} />
			<PrivateRoute exact path="/upload/" component={App} />
		</div>
	</Router>
);

const authObj = {
	isAuthenticated: false,
	async authenticate(email, password) {
		this.isAuthenticated = true;
		const call = await fetch(`${config.url}/login`, {
			method: 'POST',
			body: JSON.stringify({ user_name: email, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return call.json();
	}
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authObj.isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/upload/login',
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false,
			loginError: false
		};
		this.login = this.login.bind(this);
	}

	async login(e) {
		const email = ReactDOM.findDOMNode(this.refs.email).value;
		const password = ReactDOM.findDOMNode(this.refs.password).value;
		e.preventDefault();
		const res = await authObj.authenticate(email, password);
		if (res.status) {
			this.setState({ redirectToReferrer: true });
		} else {
			this.setState({ loginError: res.message });
		}
	}

	render() {
		return (
			<div>
				{this.state.redirectToReferrer ? (
					<Redirect to={'/upload'} />
				) : (
					<div>
						<header>
							<img src="http://base.emmis.acsitefactory.com/sites/all/modules/custom/emmis_theme/logos/base.png" />
						</header>
						<h2>Login</h2>
						<div className="error">{this.state.loginError}</div>
						<form onSubmit={this.login}>
							<input
								ref="email"
								className="login-input"
								type="email"
								placeholder="Email"
							/>
							<input
								ref="password"
								className="login-input"
								type="password"
								placeholder="Password"
							/>
							<input className="submit" type="submit" value="Login" />
						</form>
					</div>
				)}
			</div>
		);
	}
}

render(<Auth />, document.getElementById('app'));
