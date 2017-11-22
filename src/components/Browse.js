import React, { Component } from 'react';
require('./browse.scss');
import File from './File.js'

export default class Browse extends Component {
  render() {
		return (
      <div className="browse-container">
        {this.props.files.map((file, i)=> {
         return <File name={file.Key} key={i}/>
        })}
        <button className="back-button" onClick={this.props.clearState}>Back</button>
      </div>
		);
	}
}
