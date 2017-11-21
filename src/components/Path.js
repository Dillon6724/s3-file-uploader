import React, { Component } from 'react';
require('./path.scss')

export default class Path extends Component {
  render() {
		return (
      <div className="path-container">
        <div className="file-name">{this.props.pathToFile.split("/").pop()}: </div><a className="path" href={this.props.pathToFile}>{this.props.pathToFile}</a>
      </div>
		);
	}
}
