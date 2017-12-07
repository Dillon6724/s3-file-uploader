import React, { Component } from 'react';
require('./form.scss');
import {Link} from 'react-router-dom';

export default class Form extends Component {
  constructor(props) {
    super(props);
  }
  render() {
		return (
      <div>
        <h2>Upload your files</h2>
        <form>
          <div className="file-input-container">
            <input type="file" onChange={this.props.handleImageChange} multiple/>
          </div>
          <Link className="submit" type="submit" to="/myfiles" onClick={this.props.handleSubmit}>Upload</Link>
          <h2>Find your files</h2>
          <Link  className="submit" to="/library" onClick={this.props.browse}>Library</Link>
        </form>
      </div>
		);
	}
}
