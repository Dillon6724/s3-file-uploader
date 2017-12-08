import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const Auth = () => (
  <Router>
    <div>
      <Route path="/login" component={Login}/>
      <PrivateRoute exact path="/" component={App}/>
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <div>
      <App/>
    </div>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
    this.login = this.login.bind(this)
  }

  login (e) {
    console.log("login")
    e.preventDefault();
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={"/"} />
      )
    }

    return (
      <div>
        <h2>Login, brah</h2>
        <form onSubmit={this.login}>
          <input ref="username" className="login-input" type="email" placeholder="Email"/>
          <input ref="password" className="login-input" type="password" placeholder="Password" />
          <input className="submit" type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

render(
  <Auth/>,
    document.getElementById('app')
)
