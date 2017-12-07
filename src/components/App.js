import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from './Header.js';
import Form from './Form.js';
import Links from './Links.js';
import Library from './Library.js'
import Login from './Login';
import Auth from './Auth.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      paths: [],
      loading: false,
      browsing: false,
      browsingFiles: [],
      username: "",
      password: "",
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.browse = this.browse.bind(this);
    this.login = this.login.bind(this);
  }

  getFiles(files) {
    let filesArray = []
    for(let i = 0; i < files.length; i++) {
      filesArray.push(files[i])
    }
    return filesArray
  }

  handleImageChange(e) {
    e.preventDefault();
    const files =  this.getFiles(e.target.files);
    this.setState({ files })
  }

  async sendFile(file) {
    let imageFormData = new FormData();
    imageFormData.append('imageFile', file);
    const res = await fetch("http://localhost:3000/upload",{ method: "POST", body: imageFormData})
    return await res.json();
  }

  async handleSubmit(e) {
    if (this.state.files.length > 0){
      this.setState({loading: true})
      const paths = []
      for (var i = 0; i < this.state.files.length; i++) {
        let file = this.state.files[i];
        const data = await this.sendFile(file);
        paths.push(data.path);
        if (i === this.state.files.length -1) this.setState({paths, loading:false, browsingFiles: []})
      }
    }
  }

  clearState () {
    this.setState({
      files: [],
      paths: [],
      loading: false,
      browsing:false,
    })
  }

  async browse (e) {
    this.setState({
      loading: true
    })
    const res = await fetch("http://localhost:3000/files",{ method: "get"})
    const files = await res.json()
    this.setState({
      loading: false,
      browsing: true,
      browsingFiles: files.data.sort((a, b) => a.Key.localeCompare(b.Key)),
    })
  }

  async login(username, password) {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      return data.json()
    }).then((res) => {
      if (res.status) {
        console.log("login", res)
        this.setState({username, password})
      } else {
        this.setState({loginError: res.message})
      }
    })
  }

  authenticate (username, password) {
    fetch("http://localhost:3000/login", {
          method: "POST",
          body: JSON.stringify({username, password}),
          headers: {
            'Content-Type': 'application/json'
          }
    }).then((res)=> {return res.json()}).then((data) => {
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route
              exact path='/'
              render={(props) => (
                <Form handleSubmit={this.handleSubmit}
                 handleImageChange={this.handleImageChange}
                 browsing={this.state.browsing}
                 browse={this.browse}
                 clearState={this.clearState}
                 files={this.state.browsingFiles} />
               )}
             />
            <Route
              path='/login'
              component = {Login}
              login={this.login}
            />
            <Route
              path='/library'
              render={(props) =>
                <Library
                  files={this.state.browsingFiles}
                  clearState={this.clearState}
                  loading={this.state.loading}
                />
              }
            />
            <Route
              exact path='/myfiles'
              render={(props) => (
                <Links
                  paths={this.state.paths}
                  clearState={this.clearState}
                  loading={this.state.loading}
                />)}
            />
          </Switch>
        </div>
      </Router>
    );
	}
}
