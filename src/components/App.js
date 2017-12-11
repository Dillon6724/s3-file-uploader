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
      redirectToReferrer: false
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.browse = this.browse.bind(this);
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
    this.setState({submitted: true})
    e.preventDefault();
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
      submitted: false
    })
  }

  async browse (e) {
    e.preventDefault();
    this.setState({
      browsing: true,
      loading: true
    })
    const res = await fetch("http://localhost:3000/files",{ method: "get"})
    const files = await res.json()
    this.setState({
      loading: false,
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
    }).then((data) => {return data.json()})
      .then((res) => {
      if (res.status) {
        console.log("login", res)
        //  this.setState({ redirectToReferrer: true })
      } else {
        this.setState({loginError: res.message})
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.browsing ?
          <Library
            loading={this.state.loading}
            files={this.state.browsingFiles}
            clearState={this.clearState}
          />
        : this.state.submitted ?
          <Links
            loading={this.state.loading}
            paths={this.state.paths}
            clearState={this.clearState}
          />
        :
        <Form
           handleSubmit={this.handleSubmit}
           handleImageChange={this.handleImageChange}
           browsing={this.state.browsing}
           browse={this.browse}
           clearState={this.clearState}
           files={this.state.browsingFiles}
         />
       }
     </div>
    );
	}
}
