import React, { Component } from 'react';
require('./form.scss');
import Library from './Library';

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

            <h2>Find your files</h2>
            <button className="submit" type="submit" onClick={this.props.browse}>Library</button>
          </form>
        </div>
        :
        <Library files={this.props.files} clearState={this.props.clearState}/>
        }
      </div>
		);
	}
}
