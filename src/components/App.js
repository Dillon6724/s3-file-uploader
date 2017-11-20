import React, { Component } from 'react';
import 'whatwg-fetch';
import Loading from './Loading.js';
import Header from './Header.js';
import Form from './Form.js';
import Links from './Links.js';

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
    this.clearState = this.clearState.bind(this);
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
    const paths = []
    for (var i = 0; i < this.state.files.length; i++) {
      let file = this.state.files[i];
      const data = await this.sendFile(file);
      paths.push(data.path);
      if (i === this.state.files.length -1) this.setState({paths, loading:false})
    }
  }

  clearState () {
    this.setState({
      files: [],
      paths: [],
      loading: false,
    })
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.loading ?
          <Loading />
        : this.state.paths.length > 0 ?
          <Links paths={this.state.paths} clearState={this.clearState}/>
        :
          <Form handleSubmit={this.handleSubmit} handleImageChange={this.handleImageChange}/>
        }
      </div>
    );
	}
}
