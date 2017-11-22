import React, { Component } from 'react';
require('./form.scss');
import Browse from './browse';

export default class Form extends Component {
  render() {
		return (
      <div>
        {!this.props.browsing ?
        <div>
          <h2>Upload your files</h2>
          <form>
            <div className="file-input-container">
              <input type="file" onChange={this.props.handleImageChange} multiple/>
            </div>
            <button className="submit" type="submit" onClick={this.props.handleSubmit}>Upload</button>
            <button className="submit" type="submit" onClick={this.props.browse}>Browse</button>
          </form>
        </div>
        :
        <Browse files={this.props.files} clearState={this.props.clearState}/>
        }
      </div>
		);
	}
}
