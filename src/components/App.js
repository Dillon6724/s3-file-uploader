import React, { Component } from 'react';
import 'whatwg-fetch';
import Loading from './Loading.js';
import Header from './Header.js';
import Form from './Form.js';
import Links from './Links.js';
import Login from './Login'

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
      auth: {
        status:false,
        message:""
      }
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
    })
  }

  async browse (e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/files",{ method: "get"})
     const files = await res.json()
    this.setState({
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
     return fetch("http://localhost:3000/login", {
          method: "POST",
          body: JSON.stringify({username, password}),
          headers: {
            'Content-Type': 'application/json'
          }
    })
    .then((data) => {return data.json()})
    .then((res) => {
      console.log(res)
    })
  }

  isLoggedIn (username, password) {


  }

  render() {
    this.isLoggedIn(this.state.username, this.state.password)
    return (
      <div>
          <Header />
        {   this.authenticate(this.stateusername, this.state.password).then((res) => {console.log(res)})}
            this.authenticate(this.state.username, this.state.password) && this.state.loading ?
            <Loading />
          :  this.authenticate(this.state.username, this.state.password) && this.state.paths.length > 0 ?
            <Links
              paths={this.state.paths}
              clearState={this.clearState}
            />
          : this.authenticate(this.state.username, this.state.password) ?
            <Form
              handleSubmit={this.handleSubmit}
              handleImageChange={this.handleImageChange}
              browsing={this.state.browsing}
              browse={this.browse}
              clearState={this.clearState}
              files={this.state.browsingFiles}
            />
          :
            <Login login={this.login}/>
          }
        </div>
    );
	}
}
