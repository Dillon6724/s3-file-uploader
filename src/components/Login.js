import React, { Component } from 'react';
require('./login.scss')

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.props.login(this.refs.username.value, this.refs.password.value)
  }

  render() {
		return (
      <div>
        <h2>Login, brah</h2>
        <form onSubmit={this.login}>
          <input ref="username" className="login-input" type="email" placeholder="Email"/>
          <input ref="password" className="login-input" type="password" placeholder="Password" />
          <input className="submit" type="submit" value="Login" />
        </form>
      </div>
		);
	}
}
