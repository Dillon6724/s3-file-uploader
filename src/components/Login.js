import React, { Component } from 'react';
require('./login.scss')
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    fakeAuth.authenticate(this.refs.username.value, this.refs.password.value)
  }

  render() {
		return (
      <div>
        {this.props.redirectToReferrer ?
          <div>
           <Redirect to="/"/>
          </div>
        :
          <div>
            <h2>Login, brah</h2>
            <form onSubmit={this.login}>
              <input ref="username" className="login-input" type="email" placeholder="Email"/>
              <input ref="password" className="login-input" type="password" placeholder="Password" />
              <input className="submit" type="submit" value="Login" />
            </form>
          </div>
        }
      </div>
		);
	}
}


const fakeAuth = {
  isAuthenticated: false,
  authenticate(username, password) {
    console.log(username, password)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}
