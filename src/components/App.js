import React, { Component } from 'react';
import 'whatwg-fetch';
import Loading from './Loading.js';
import Header from './Header.js';
import Form from './Form.js';
import Path from './Path.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      paths: [],
      loading: false,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({loading: true})
    this.state.files.forEach(async (file)=> {
      const data = await this.sendFile(file);
      console.log(data)
    })

  }

  render() {
    return (
      <div>
        <Header />
        {this.state.loading ?
          <Loading />
        : this.state.paths.length > 0 ?
          <Path path={this.state.path}/>
        :
          <Form handleSubmit={this.handleSubmit} handleImageChange={this.handleImageChange}/>
        }
      </div>
    );
	}
}
