import React, { Component } from 'react';
require('./form.scss')

export default class Form extends Component {
  render() {
		return (
      <div>
        <h2>Upload your files</h2>
        <form>
          <div className="file-input-container">
            <input type="file" onChange={this.props.handleImageChange} multiple/>
          </div>
          <button className="submit" type="submit" onClick={this.props.handleSubmit}>Upload</button>
        </form>
      </div>
		);
	}
}
